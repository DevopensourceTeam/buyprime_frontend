import toastr from 'toastr';

/**
 * @desc import constants
 */
import {
	TOASTR_OPTIONS,
	CHANGE_INPUT_CHECKOUT,
	SHOW_ERRORS_CHECKOUT,
	FILL_IN_FIELDS,
	LOGIN,
	REGISTER,
	LOGOUT,
	GET_COUNTRIES,
	SELECT_COUNTRY,
	SELECT_PROVINCE,
	SHIPPING_ADDRESS,
	SHIPPING_METHODS,
	PAY_METHODS,
} from '../constants/actionTypes';
toastr.options = TOASTR_OPTIONS;


export default (state = {}, action) => {
	switch (action.type) {
	/**
	 * @desc When change the value of input in the Checkout
	 */
	case CHANGE_INPUT_CHECKOUT:
		return {
			...state,
			[action.key]: action.value,
		};
	/**
	 * @desc Save the errors what show in the Checkout
	 */
	case SHOW_ERRORS_CHECKOUT:
		return {
			...state,
			errorsCheckout: action.errors,
		};
	case FILL_IN_FIELDS:
		return {
			...state,
			email: action.user.email,
			fname: action.user.firstname,
			lname: action.user.lastname,
		};
	case GET_COUNTRIES:
		return {
			...state,
			countries: action.payload.countries.sort(),
		};
	case SELECT_COUNTRY:
		const countryName = action.country ? state.countries.filter((country) =>
			country.id === action.country)[0].full_name_english : [];
		const provinces = action.country ? state.countries.filter((country) =>
			country.id === action.country)[0].available_regions : [];
		return {
			...state,
			country: action.country,
			countryName: countryName,
			provinces: provinces ? provinces : [],
		};
	case SELECT_PROVINCE:
		const provinceName = action.province ? state.provinces.filter((province)=>
			province.id === action.province)[0].name : [];
		return {
			...state,
			provinceId: action.province,
			provinceName: provinceName,
		};
	case SHIPPING_ADDRESS:
		return {
			...state,
			shipMethods: action.payload.methods,
			shipAddress: action.address,
			errorsCheckout: [],
		};
	case SHIPPING_METHODS:
		action.props.history.push('/payment');
		return {
			...state,
			payMethods: action.payload.methods.payment_methods,
			totals: action.payload.methods.totals,
		};
	case PAY_METHODS:
		toastr.success('SUCCESS PURCHASE');
		action.props.history.push('/');
		return {};
	case LOGIN:
	case REGISTER:
	case LOGOUT:
		return {};
	default:
		return state;
	}
};
