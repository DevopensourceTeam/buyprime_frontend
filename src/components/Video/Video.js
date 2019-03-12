import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';

import ReactPlayer from 'react-player';
import SideBar from '../SideBar';
import Messages from './Messages';

import {
	GET_INFO_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
	SHOW_SIDEBAR,
} from '../../constants/actionTypes';

const mapStateToProps = (state) => {
	return {
		userChat: state.video.userChat ? state.video.userChat : 'DaniOrtiz',
		...state.video,
		stateSidebar: state.common.stateSidebar,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getInfoChat: (userSlug) =>
		dispatch({type: GET_INFO_CHAT, payload: agent.Video.getUserChat(userSlug)}),
	changeInput: (message) =>
		dispatch({type: CHANGE_INPUT_CHAT, message}),
	saveMessage: (message, user) =>
		dispatch({
			type: SAVE_MESSAGE,
			payload: agent.Video.saveMessage(message, user),
		}),
	showSidebar: (state) =>
		dispatch({type: SHOW_SIDEBAR, state}),
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
		this.changeInput = (ev) => {
			this.props.changeInput(ev.target.value);
		};
		this.saveMessage = (ev) => {
			ev.preventDefault();
			this.props.saveMessage(this.props.message, this.props.userSlug);
		};
	}
	/**
	 * @function componentDidMount
	 */
	componentDidMount() {
		this.props.getInfoChat(this.props.userChat.toLowerCase().replace(' ', '-'));
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
							messages={this.props.messagesChat}
							saveMessage={this.saveMessage}
							changeInput={this.changeInput}
							message={this.props.message} />
					</section>
				</section>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
