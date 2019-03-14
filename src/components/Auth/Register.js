import React from 'react';
import {connect} from 'react-redux';

/**
* @desc Import constants
*/
import {
	CHANGE_INPUT_AUTH,
	SHOW_ERRORS_REGISTER,
	REGISTER,
} from '../../constants/actionTypes';
import {validate} from './validate';

/**
 * @constant mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => ({
	...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	changeInput: (key, value) =>
		dispatch({type: CHANGE_INPUT_AUTH, key, value}),
	showErrors: (errors) =>
		dispatch({type: SHOW_ERRORS_REGISTER, errors}),
	register: () =>
		dispatch({type: REGISTER}),
});
/**
 * @class Regsiter
 */
class Register extends React.Component {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};
		this.submitForm = async (ev) => {
			ev.preventDefault();
			const stateForm =
				await validate.validateFormReg(
					this.props.fname,
					this.props.lname,
					this.props.emailR,
					this.props.passwordR,
					this.props.cpasswordR);
			if (stateForm.length > 0) {
				console.log(stateForm);
				this.props.showErrors(stateForm);
			} else {
				this.props.register();
				console.log('Llamando a la API');
			}
		};
	}
	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		return (
			<form className="p-3 w-50" onSubmit={this.submitForm}>
				<fieldset className="form-row">
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
				<fieldset className="form-row">
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
						<input required
							type="password"
							className="form-control"
							id="password"
							placeholder="Password"
							value={this.props.passwordR || ''}
							onChange={this.changeInput('passwordR')}/>
					</section>
					<section className="form-group col-md-6 mw-100">
						<label className="mb-0" htmlFor="confirmpassword">
							Confirm Password
							<label className="ml-1 text-danger">*</label>
						</label>
						<input required
							type="password"
							className="form-control"
							id="confirmpassword"
							placeholder="Password"
							value={this.props.cpasswordR || ''}
							onChange={this.changeInput('cpasswordR')}/>
					</section>
				</fieldset>
				<button type="submit" className="btn btn-primary">
					Create an Account</button>

				<p className="mt-3 text-danger small">* Required Fields</p>
			</form>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
