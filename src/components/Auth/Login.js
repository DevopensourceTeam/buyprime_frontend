import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';

import Errors from '../Errors';
import {Input} from '../Form/Input';
import {InputPass} from '../Form/InputPass';

/**
* @desc Import constants
*/
import {
	CHANGE_INPUT_AUTH,
	CHANGE_TYPE_PASS,
	SHOW_ERRORS_LOGIN,
	LOGIN,
	UNMOUNT_LOGIN,
} from '../../constants/actionTypes';
import {validate} from './validate';

/**
 * @constant mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => ({
	...state.auth,
	token: state.common.token,
});

/**
 * @function mapDispatchToProps
 * @param {Object} dispatch
 * @param {Object} props
 * @return {*}
 */
const mapDispatchToProps = (dispatch, props) => ({
	/**
	 * @function changeInput
	 * @desc Save in store the changes of the input
	 * @param {String} key
	 * @param {String} value
	 * @return {*}
	 */
	changeInput: (key, value) =>
		dispatch({type: CHANGE_INPUT_AUTH, key, value}),

	/**
	 * @function changePassType
	 * @desc Change type of the input password in the store
	 * @param {String} key
	 * @param {String} passType
	 * @return {*}
	 */
	changePassType: (key, passType) =>
		dispatch({type: CHANGE_TYPE_PASS, key, passType}),

	/**
	 * @function showErrors
	 * @desc Save the errors to show in Login component
	 * @param {Array} errors
	 * @return {*}
	 */
	showErrors: (errors) =>
		dispatch({type: SHOW_ERRORS_LOGIN, errors}),

	/**
	 * @function login
	 * @description Log in the user in the application.
	 * @param {String} user
	 * @param {String} password
	 */
	login: (user, password) => {
		dispatch({type: LOGIN,
			payload: agent.Auth.loginCustomer(user, password), props});
	},

	/**
	 * @function unmount
	 * @desc unmount the component
	 * @return {*}
	 */
	unmount: () =>
		dispatch({type: UNMOUNT_LOGIN}),
});

/**
 * @class Login
 */
class Login extends React.Component {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		/**
		 * @desc Initial state Login component. disable button from the form,
		 * unmount to know when can unmount the component.
		 */
		this.state = {
			buttLdisable: false,
			unmount: true,
		};

		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};
		this.submitForm = async (ev) => {
			ev.preventDefault();
			this.setState({
				buttLdisable: true,
				unmount: false,
			});
			/**
			 * @desc Call function validateFormLog to validate the field of the form
			 */
			const stateForm =
				await validate.validateFormLog(this.props.emailL, this.props.passwordL);
			/**
			 * @desc If stateForm have errors, show errors else call
			 * the nodejs backend
			 */
			if (stateForm.length > 0) {
				this.setState({
					buttLdisable: false,
					unmount: true,
				});
				this.props.showErrors(stateForm);
			} else {
				this.props.login(this.props.emailL, this.props.passwordL);
			}
		};
	}
	/**
	 * @function componentDidMount
	 * @desc Check if user is loged in the app.
	 */
	componentDidMount() {
		if (this.props.token) {
			this.props.history.push('/');
		}
	}
	/**
	 * @function getDerivedStateFromProps
	 * @desc Validate to know when disable the button
	 * @param {*} props
	 * @param {*} state
	 * @return {Boolean}
	 */
	static getDerivedStateFromProps(props, state) {
		if (props.errorsLogin) {
			if (props.errorsLogin.length > 0 &&
				props.errorsLogin !== state.errorsLogin) {
				return {
					buttLdisable: false,
					unmount: true,
					errorsLogin: props.errorsLogin,
				};
			}
		}
		return true;
	}
	/**
	 * @function componentWillUnmount
	 */
	componentWillUnmount() {
		if (this.state.unmount) {
			this.props.unmount();
		}
	}
	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		return (
			<section>
				<Errors errors={this.props.errorsLogin} />
				<form className="p-3 w-50" onSubmit={this.submitForm}>
					<fieldset className="form-row d-flex flex-column">
						<p className="m-0 text-muted h3">Customer Login</p>
						<hr className="mt-2 mb-2" />
						<Input type='email' name='email' labelName='Email'
							placeholder='Your Email' storeName='emailL'
							value={this.props.emailL} changeInput={this.changeInput} />

						<InputPass name='password' value={this.props.passwordL}
							labelName='Password' storeName='passwordL'
							changeInput={this.changeInput} passName='passLogType'
							placeholder='Password' passType={this.props.passLogType}
							changePassType={this.props.changePassType} />
					</fieldset>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={this.state.buttLdisable}>
						Sign In</button>
					<p className="mt-3 text-danger small">* Required Fields</p>
				</form>
			</section>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
