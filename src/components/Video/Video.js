import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import SendBird from 'sendbird';

import SideBar from '../SideBar';
import Messages from './Messages';


/**
 * @desc Import constants
 */
import {
	INIT_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
	SHOW_SIDEBAR,
	UNMOUNT_VIDEO,
} from '../../constants/actionTypes';

const sb = new SendBird({appId: process.env.REACT_APP_SENDBIRD_ID});
/**
 * @function mapStateToProps
 * @param {*} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	return {
		userChat: state.video.userChat ? state.video.userChat : 'DaniOrtiz',
		userSlug: state.video.userSlug ? state.video.userSlug : 'daniortiz',
		...state.video,
		stateSidebar: state.common.stateSidebar,
	};
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @return {*}
 */
const mapDispatchToProps = (dispatch) => ({
	/**
	 * @function getInfoChat
	 * @param {String} channel
	 * @param {String} cover
	 * @desc Set channel
	 * @return {*}
	 */
	initChat: (channel, cover) =>
		dispatch({type: INIT_CHAT, channel, cover}),

	/**
	 * @function changeInput
	 * @param {String} message
	 * @desc Change value of the input
	 * @return {*}
	 */
	changeInput: (message) =>
		dispatch({type: CHANGE_INPUT_CHAT, message}),

	/**
	 * @function saveMessage
	 * @param {String} message
	 * @desc Add a new message
	 * @return {*}
	 */
	saveMessage: (message) =>
		dispatch({type: SAVE_MESSAGE, message}),

	/**
	 * @function showSidebar
	 * @param {String} state Boolean
	 * @desc Change stat SideBar
	 * @return {*}
	 */
	showSidebar: (state) =>
		dispatch({type: SHOW_SIDEBAR, state}),

	/**
	 * @function unmount
	 * @desc Clear data video
	 * @return {*}
	 */
	unmount: () =>
		dispatch({type: UNMOUNT_VIDEO}),
});

/**
 * @class Video
 */
class Video extends React.Component {
	/**
	 * @function constructor
	 */
	constructor() {
		super();
		const that = this;
		this.openChannel = '';
		this.changeInput = (ev) => {
			this.props.changeInput(ev.target.value);
		};

		this.saveMessage = (ev) => {
			ev.preventDefault();

			this.openChannel.sendUserMessage(this.props.message,
				(message, error) => {
					if (error) {
						return;
					}

					that.props.saveMessage(message);
				});
		};
	}

	/**
	 * @function componentDidMount
	 */
	componentDidMount() {
		const that = this;
		const ChannelHandler = new sb.ChannelHandler();

		ChannelHandler.onMessageReceived = (channel, message) => {
			that.props.saveMessage(message);
			this.setState({reaload: true});
		};
		sb.addChannelHandler('208549964', ChannelHandler);
	}
	/* eslint-disable*/
	/**
	 * @function componentWillMount
	 */
	componentWillMount() {
		const that = this;
		sb.connect(this.props.userSlug,
			(user, error) => {
				if (error) {
					return;
				}
			});

			sb.updateCurrentUserInfo(this.props.userChat, '', (response, error) => {
			if (error) {
				return;
			};
		});

		sb.OpenChannel.getChannel('devopensource', (channel, error) => {
			if (error) {
				return;
			}
			this.openChannel = channel;

			channel.enter(function(response, error) {
				if (error) {
					return;
				}
				
				that.props.initChat(channel.name, channel.coverUrl);
			});
		});
	}
	/* eslint-enable*/
	/**
	 * @function componentWillUnmount
	 */
	componentWillUnmount() {
		this.openChannel.exit((response, error) => {
			if (error) {
				return;
			}
		});
		sb.disconnect(() => {
		});

		this.props.unmount();
	}

	/**
	 * @function render
	 * @return {JSX} JSX del video
	 */
	render() {
		return (
			<article className="d-flex fullHeight">
				<SideBar
					showSidebar={this.props.showSidebar}
					stateSidebar={this.props.stateSidebar} />
				<section className="content-video d-flex w-100">
					<section
						className="video-displayer m-3 border rounded-bottom fit-content">
						<ReactPlayer url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
							playing
							controls={true} />
						<section className="m-3">
							<h2 className="mt-2">Conejo Amoroso</h2>
							<p className="mt-2">Un conejo super amoroso</p>
							<button className="btn btn-success m-2" type="submit">
								Comprar
							</button>
						</section>
					</section>
					<section className="video-chat border">
						<Messages
							channel={this.props.channelName}
							cover={this.props.channelCover}
							messages={this.props.messages}
							saveMessage={this.saveMessage}
							changeInput={this.changeInput}
							message={this.props.message}
							buttDisabled={this.props.buttDisabled} />
					</section>
				</section>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
