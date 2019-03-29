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
	SHOW_ERRORS_REGISTER,
	REGISTER,
	UNMOUNT_REGISTER,
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
		dispatch({type: SHOW_ERRORS_REGISTER, errors}),

	/**
	 * @function register
	 * @description Register the user in the application.
	 * @param {String} user
	 * @param {String} password
	 */
	register: (user) => {
		dispatch({type: REGISTER, payload: agent.Auth.createCustomer(user), props});
	},

	/**
	 * @function unmount
	 * @desc unmount the component
	 * @return {*}
	 */
	unmount: () =>
		dispatch({type: UNMOUNT_REGISTER}),
});
/**
 * @class Register
 */
class Register extends React.Component {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		/**
		 * @desc Initial state Register component. disable button from the form,
		 * unmount to know when can unmount the component.
		 */
		this.state = {
			buttRdisable: false,
			unmount: true,
		};

		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};
		this.submitForm = async (ev) => {
			ev.preventDefault();
			this.setState({
				buttRdisable: true,
				unmount: false,
			});
			/**
			 * @desc Call function validateFormReg to validate the field of the form
			 */
			const stateForm =
				await validate.validateFormReg(
					this.props.fname,
					this.props.lname,
					this.props.emailR,
					this.props.passwordR,
					this.props.cpasswordR);
			/**
			 * @desc If stateForm have errors, show errors else call
			 * the nodejs backend
			 */
			if (stateForm.length > 0) {
				this.setState({
					buttRdisable: false,
					unmount: true,
				});
				this.props.showErrors(stateForm);
			} else {
				const magJson = {
					'customer': {
						'email': this.props.emailR,
						'firstname': this.props.fname,
						'lastname': this.props.lname,
					},
					'password': this.props.passwordR,
				};
				this.props.register(magJson);
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
		if (props.errorsRegister) {
			if (props.errorsRegister.length > 0 &&
				props.errorsRegister !== state.errorsRegister) {
				return {
					buttRdisable: false,
					unmount: true,
					errorsRegister: props.errorsRegister,
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
				<Errors errors={this.props.errorsRegister} />
				<form className="p-3 w-50" onSubmit={this.submitForm}>
					<fieldset className="form-row d-flex flex-column">
						<p className="m-0 text-muted h3">Personal Information</p>
						<hr className="mt-2 mb-2" />
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0" htmlFor="firstname">
								First Name
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="text"
								className="form-control"
								id="firstname"
								placeholder="First Name"
								value={this.props.fname || ''}
								onChange={this.changeInput('fname')}/>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0" htmlFor="lastname">
								Last Name
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="text"
								className="form-control"
								id="lastname"
								placeholder="Last Name"
								value={this.props.lname || ''}
								onChange={this.changeInput('lname')}/>
						</section>
					</fieldset>
					<fieldset className="form-row d-flex flex-column">
						<p className="m-0 text-muted h3">Sign-in Information</p>
						<hr className="mt-2 mb-2" />
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0" htmlFor="email">
								Email
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="email"
								className="form-control"
								id="email"
								placeholder="Email"
								value={this.props.emailR || ''}
								onChange={this.changeInput('emailR')}/>
						</section>
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0" htmlFor="password">
								Password
								<label className="ml-1 text-danger">*</label>
							</label>
							<section className="d-flex align-items-center">
								<input required
									type={this.props.passRegType}
									className="form-control"
									id="password"
									placeholder="Password"
									value={this.props.passwordR || ''}
									onChange={this.changeInput('passwordR')}/>
								{
									this.props.passRegType === 'password' ?
										<i className="far fa-eye ml-3 mb-0 c-pointer h5"
											onClick={() =>
												this.props.changePassType('passRegType', 'text')}></i>
										:
										<i className="far fa-eye-slash ml-3
										text-muted mb-0 c-pointer h5"
										onClick={() =>
											this.props.changePassType('passRegType', 'password')}>
										</i>
								}
							</section>
						</section>
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0" htmlFor="confirmpassword">
								Confirm Password
								<label className="ml-1 text-danger">*</label>
							</label>
							<section className="d-flex align-items-center">
								<input required
									type={this.props.passRegCType}
									className="form-control"
									id="confirmpassword"
									placeholder="Password"
									value={this.props.cpasswordR || ''}
									onChange={this.changeInput('cpasswordR')}/>
								{
									this.props.passRegCType === 'password' ?
										<i className="far fa-eye ml-3 mb-0 c-pointer h5"
											onClick={() =>
												this.props.changePassType('passRegCType', 'text')}></i>
										:
										<i className="far fa-eye-slash ml-3
										text-muted mb-0 c-pointer h5"
										onClick={() =>
											this.props.changePassType('passRegCType', 'password')}>
										</i>
								}
							</section>
						</section>
					</fieldset>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={this.state.buttRdisable}>
						Create an Account</button>

					<p className="mt-3 text-danger small">* Required Fields</p>
				</form>
			</section>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
