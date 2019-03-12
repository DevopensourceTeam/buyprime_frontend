import React from 'react';
import {connect} from 'react-redux';

import {
	CHANGE_HOME_INPUT,
} from '../constants/actionTypes';

const mapStateToProps = (state) => {
	return {
		userChat: state.video ? state.video.userChat : '',
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeInput: (user) =>
		dispatch({type: CHANGE_HOME_INPUT, user}),
});

/**
 * @class Home
 */
class Home extends React.Component {
	/**
	 * @function constructor
	 */
	constructor() {
		super();
		/**
		 * @function changeInput
		 * @param {*} ev
		 */
		this.changeInput = (ev) => {
			this.props.changeInput(ev.target.value);
		};
	}

	/**
	 * @function render
	 * @return {JSX} JSX del Home
	 */
	render() {
		const userChat = this.props.userChat;
		return (
			<article className="pt-3 text-center">
				<h1>Home</h1>
				<form>
					<fieldset>
						<label>Nombre:</label>
						<input
							type="text"
							value={userChat || ''}
							onChange={this.changeInput} />
					</fieldset>
				</form>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
