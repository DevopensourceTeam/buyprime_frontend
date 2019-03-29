import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';

import Errors from '../Errors';
/**
* @desc Import constants
*/
import {
	CHANGE_INPUT_CHECKOUT,
	SHOW_ERRORS_CHECKOUT,
	FILL_IN_FIELDS,
	GET_COUNTRIES,
	SELECT_COUNTRY,
	SELECT_PROVINCE,
} from '../../constants/actionTypes';
import {validate} from './validate';

/**
 * @constant mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => ({
	...state.checkout,
	user: state.common.userInfo,
	cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch, props) => ({
	/**
	 * @function fillinFields
	 * @desc Fill in fields what have in redux
	 * @param {Object} user
	 * @return {*}
	 */
	fillinFields: (user) =>
		dispatch({type: FILL_IN_FIELDS, user}),

	/**
	 * @function changeInput
	 * @desc Save in store the changes of the input
	 * @param {String} key
	 * @param {String} value
	 * @return {*}
	 */
	changeInput: (key, value) =>
		dispatch({type: CHANGE_INPUT_CHECKOUT, key, value}),

	/**
	 * @function showErrors
	 * @desc Save the errors to show in Login component
	 * @param {Array} errors
	 * @return {*}
	 */
	showErrors: (errors) =>
		dispatch({type: SHOW_ERRORS_CHECKOUT, errors}),

	/**
	 * @function getCountries
	 * @return {*}
	 */
	getCountries: () =>
		dispatch({type: GET_COUNTRIES, payload: agent.Checkout.getCountries()}),

	/**
	 * @function selectCountry
	 * @param {String} country
	 * @return {*}
	 */
	selectCountry: (country) =>
		dispatch({type: SELECT_COUNTRY, country}),

	/**
	 * @function selectCountry
	 * @param {String} province
	 * @return {*}
	 */
	selectProvince: (province) =>
		dispatch({type: SELECT_PROVINCE, province}),
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
		 * @desc Initial state Register component. disable button from the form.
		 */
		this.state = {
			buttdisable: false,
		};

		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};
		this.selectCountry = () => (ev) => {
			this.props.selectCountry(ev.target.value);
		};
		this.selectProvince = () => (ev) => {
			this.props.selectProvince(ev.target.value);
		};
		this.submitForm = async (ev) => {
			ev.preventDefault();
			this.setState({
				buttdisable: true,
			});
			/**
			 * @desc Call function validateFormCheck to validate the field of the form
			 */
			const stateForm = await validate.validateFormCheck(
				this.props.email,
				this.props.fname,
				this.props.lname,
				this.props.company,
				this.props.street,
				this.props.city,
				this.props.country,
				this.props.provinceId,
				this.props.postalcode,
				this.props.phone,
				this.props.provinces);
			/**
			 * @desc If stateForm have errors, show errors else call
			 * the nodejs backend
			 */
			if (stateForm.length > 0) {
				this.setState({
					buttdisable: false,
				});
				window.scrollTo(0, 0);
				this.props.showErrors(stateForm);
			} else {
				const checkJson = {
					'address': {
						'firstname': this.props.fname,
						'lastname': this.props.lname,
						'street': [
							this.props.street,
						],
						'city': this.props.city,
						'postcode': this.props.postalcode,
						'country_id': 'ES',
						'telephone': this.props.phone,
						'regionId': 132,
					},
					'userForShipping': 1,
				};
				console.log(checkJson);
				this.props.history.push('/checkout/payment');
			};
		};
	}

	/**
	 * @function componentDidMount
	 * @desc Check if client is sign in and have any items in cart
	 */
	componentDidMount() {
		if (this.props.cartItems.length < 1) {
			this.props.history.push('/cart');
		} else if (this.props.user) {
			this.props.fillinFields(this.props.user);
		}
		this.props.getCountries();
	}

	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		const disableProv = this.props.provinces ?
			this.props.provinces.length < 1 : false;
		return (
			<section>
				<Errors errors={this.props.errorsCheckout} />
				<form className="p-3 w-50" onSubmit={this.submitForm}>
					<fieldset className="form-row d-flex flex-column">
						<p className="m-0 text-muted h3">Shipping Address</p>
						<hr className="mt-2 mb-2" />
						{
							!this.props.user ?
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
										value={this.props.email || ''}
										onChange={this.changeInput('email')}/>
									<hr className="mt-4 mb-4" />
								</section> : ''
						}
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
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0" htmlFor="company">
								Company
							</label>
							<input
								type="text"
								className="form-control"
								id="company"
								placeholder="Company"
								value={this.props.company || ''}
								onChange={this.changeInput('company')}/>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0" htmlFor="address">
								Street Address
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="text"
								className="form-control"
								id="address"
								placeholder="Street Address"
								value={this.props.street || ''}
								onChange={this.changeInput('street')}/>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0" htmlFor="city">
								City
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="text"
								className="form-control"
								id="city"
								placeholder="City"
								value={this.props.city || ''}
								onChange={this.changeInput('city')}/>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0">
								Country
								<label className="ml-1 text-danger">*</label>
							</label>
							<select required
								className="form-control"
								onChange={this.selectCountry()}
								disabled={!this.props.countries}
								value={this.props.country}>
								<option value=''>Select a Country</option>
								{
									this.props.countries ?
										this.props.countries.map((country, i) => {
											return <option key={i} value={country.id}>
												{country.full_name_english}</option>;
										})
										: ''
								}
							</select>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0">
								State/Province
								<label className="ml-1 text-danger">*</label>
								<select required
									className="form-control"
									disabled={!this.props.provinces
											|| disableProv}
									onChange={this.selectProvince()}
									value={this.props.provinceId}>
									<option value=''>Select a Province</option>
									{
										this.props.provinces ?
											this.props.provinces.length > 0 ?
												this.props.provinces.map((province, i) => {
													return <option key={i} value={province.id}>
														{province.name}</option>;
												})
												: '' : ''
									}
								</select>
							</label>
						</section>
						<section className="form-group col-md-6  mw-100">
							<label className="mb-0" htmlFor="postalcode">
								Zip/Postal Code
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="text"
								className="form-control"
								id="postalcode"
								placeholder="Zip/PostalCode"
								value={this.props.postalcode || ''}
								onChange={this.changeInput('postalcode')}/>
						</section>
						<section>
							<label className="mb-0" htmlFor="phone">
								Phone Number
								<label className="ml-1 text-danger">*</label>
							</label>
							<input required
								type="tel"
								className="form-control"
								id="phone"
								placeholder="Phone Number"
								value={this.props.phone || ''}
								onChange={this.changeInput('phone')}/>
						</section>
					</fieldset>
					<fieldset className="form-row d-flex flex-column">
						<p className="m-0 mt-3 text-muted h3">Shipping Methods</p>
						<hr className="mt-2 mb-2" />
						<section className="form-group col-md-6 mw-100">
							<label className="mb-0">
								$5.00
							</label>
						</section>
					</fieldset>
					<button
						type="submit"
						className="btn btn-primary btn-lg"
						disabled={this.state.buttdisable}>
						Next</button>

					<p className="mt-3 text-danger small">* Required Fields</p>
				</form>
			</section>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
