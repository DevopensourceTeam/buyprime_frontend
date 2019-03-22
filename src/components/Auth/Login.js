import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';

import Errors from '../Errors';

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
	token: state.common.userToken,
});

const mapDispatchToProps = (dispatch, props) => ({
	changeInput: (key, value) =>
		dispatch({type: CHANGE_INPUT_AUTH, key, value}),
	changePassType: (key, passType) =>
		dispatch({type: CHANGE_TYPE_PASS, key, passType}),
	showErrors: (errors) =>
		dispatch({type: SHOW_ERRORS_LOGIN, errors}),
	login: (user, password) => {
		dispatch({type: LOGIN,
			payload: agent.Auth.loginCustomer(user, password), props});
	},
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
		this.state = {
			buttLdisable: false,
		};

		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};
		this.submitForm = async (ev) => {
			ev.preventDefault();
			this.setState({
				buttLdisable: true,
			});
			const stateForm =
				await validate.validateFormLog(this.props.emailL, this.props.passwordL);
			if (stateForm.length > 0) {
				this.setState({
					buttLdisable: false,
				});
				this.props.showErrors(stateForm);
			} else {
				this.props.login(this.props.emailL, this.props.passwordL);
			}
		};
	}
	/**
	 * @function componentDidMount
	 */
	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.history.push('/');
		}
	}
	/**
	 * @function getDerivedStateFromProps
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
		this.props.unmount();
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
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0" htmlFor="email">
								Email
								<label className="ml-1 text-danger">*</label>
							</label>
							<input
								required
								type="email"
								className="form-control"
								id="email"
								placeholder="Email"
								value={this.props.emailL || ''}
								onChange={this.changeInput('emailL')} />
						</section>
						<section className="form-group col-md-6 mw-100 d-flex flex-column">
							<label className="mb-0" htmlFor="password">
								Password
								<label className="ml-1 text-danger">*</label>
							</label>
							<section className="d-flex align-items-center">
								<input
									required
									type={this.props.passLogType}
									className="form-control"
									id="password"
									placeholder="Password"
									value={this.props.passwordL || ''}
									onChange={this.changeInput('passwordL')} />
								{
									this.props.passLogType === 'password' ?
										<i className="far fa-eye ml-3 mb-0 c-pointer h5"
											onClick={() =>
												this.props.changePassType('passLogType', 'text')}></i>
										:
										<i className="far fa-eye-slash ml-3
										text-muted mb-0 c-pointer h5"
										onClick={() =>
											this.props.changePassType('passLogType', 'password')}>
										</i>
								}
							</section>
						</section>
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
