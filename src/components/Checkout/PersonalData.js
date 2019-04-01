import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';
import {Input} from '../Form/Input';
import Errors from '../Errors';
import ProductCheckout from './ProductCheckout';

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
	SHIPPING_ADDRESS,
	SHIPPING_METHODS,
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
	idCart: state.cart.idCart,
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

	/**
	 * @function shippingAddress
	 * @param {Object} address
	 * @param {Integer} idCart
	 * @return {*}
	 */
	shippingAddress: (address, idCart) =>
		dispatch({type: SHIPPING_ADDRESS,
			payload: agent.Checkout.shippingAddress(address, idCart), address}),

	/**
	 * @function shippingMethods
	 * @param {Object} methods
	 * @param {Integer} idCart
	 * @return {*}
	 */
	shippingMethods: (methods, idCart) =>
		dispatch({type: SHIPPING_METHODS,
			payload: agent.Checkout.shippingMethods(methods, idCart), props}),
});
/**
 * @class PersonalData
 */
class PersonalData extends React.Component {
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

				this.props.shippingAddress(checkJson, this.props.idCart);
				this.setState({
					buttdisable: false,
				});
			};
		};

		this.submitAll = () => (ev) => {
			ev.preventDefault();
			const address = this.props.shipAddress;
			const method = this.props.inputShipMethod;
			const allShipping = {addressInformation:
				{
					shipping_address: address.address,
					shipping_method_code: method,
					shipping_carrier_code: method,
				},
			};

			this.props.shippingMethods(allShipping, this.props.idCart);
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
			<section className="d-flex mt-4">
				<section className='mw-50 w-100'>
					<Errors errors={this.props.errorsCheckout} />
					<form className="pt-3 pl-3 pr-3" onSubmit={this.submitForm}>
						<fieldset className="form-row d-flex flex-column">
							<p className="m-0 text-muted h3">Shipping Address</p>
							<hr className="mt-2 mb-2" />
							{
								!this.props.user ?
									<Input type='text' name='email' labelName='Email'
										placeholder='Email' storeName='email'
										value={this.props.email} changeInput={this.changeInput} />
									: ''
							}
							<Input type='text' name='firstname' labelName='First Name'
								placeholder='First Name' storeName='fname'
								value={this.props.fname} changeInput={this.changeInput} />
							<Input type='text' name='lastname' labelName='Last Name'
								placeholder='Last Name' storeName='lname'
								value={this.props.lname} changeInput={this.changeInput} />
							<Input type='text' name='company' labelName='Company'
								placeholder='Company' storeName='company'
								value={this.props.company} changeInput={this.changeInput} />
							<Input type='text' name='street' labelName='Street Address'
								placeholder='Street Address' storeName='street'
								value={this.props.street} changeInput={this.changeInput} />
							<Input type='text' name='city' labelName='City'
								placeholder='City' storeName='city'
								value={this.props.city} changeInput={this.changeInput} />
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
							<Input type='text' name='postalcode' labelName='Zip/Postal Code'
								placeholder='Zip/Postal Code' storeName='postalcode'
								value={this.props.postalcode} changeInput={this.changeInput} />
							<Input type='tel' name='phone' labelName='Phone Number'
								placeholder='Phone Number' storeName='phone'
								value={this.props.phone} changeInput={this.changeInput} />
						</fieldset>
						<button
							type="submit"
							className="btn btn-primary btn-lg"
							disabled={this.state.buttdisable}>
							Next</button>
						<p className="mt-3 mb-0 text-danger small">* Required Fields</p>
					</form>
					<form className="p-3" onSubmit={this.submitAll()}>
						<fieldset className="d-flex flex-column">
							<p className="m-0 text-muted h3">Shipping Methods</p>
							<hr className="mt-2 mb-2" />
							{
								this.props.shipMethods ?
									this.props.shipMethods.map((method, i) => {
										return <section key={i} className="form-check ml-3 mb-2">
											<input
												className="form-check-input"
												type="radio" name="personalRadio"
												value={method.method_code}
												onChange={this.changeInput('inputShipMethod')}/>
											<label className="form-check-label">
												{method.method_title} {method.carrier_title}
											</label>
										</section>;
									}) : <p>Save Shipping Address</p>
							}
						</fieldset>
						<button
							type="submit"
							className="btn btn-primary btn-lg mt-2"
							disabled={!this.props.inputShipMethod}>
							Next</button>
					</form>
				</section>
				<section className='mw-50 w-100 d-flex flex-column p-3'>
					<p className="m-0 text-muted h3">Order Summary</p>
					<hr className="mt-2 mb-2" />
					<p className="h5 m-0">{this.props.cartItems.length} Items in Cart</p>
					<section className='d-flex flex-column align-items-center'>
						<ProductCheckout products={this.props.cartItems} />
					</section>
				</section>
			</section>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);
