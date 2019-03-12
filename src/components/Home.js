import React from 'react';
import {connect} from 'react-redux';

/**
 * @desc Import constants
 */
import {
	CHANGE_HOME_INPUT,
} from '../constants/actionTypes';

/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	return {
		userChat: state.video ? state.video.userChat : '',
	};
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @return {*}
 */
const mapDispatchToProps = (dispatch) => ({
	/**
	 * @function changeInput
	 * @param {String} user
	 * @desc Change value of the input
	 * @return {*}
	 */
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
		return (
			<article className="pt-3 text-center">
				<h1>Home</h1>
				<form>
					<fieldset>
						<label>Nombre:</label>
						<input
							type="text"
							value={this.props.userChat || ''}
							onChange={this.changeInput} />
					</fieldset>
				</form>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
