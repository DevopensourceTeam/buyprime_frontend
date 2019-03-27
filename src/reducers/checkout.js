/**
 * @desc import constants
 */
import {
	CHANGE_INPUT_CHECKOUT,
	SHOW_ERRORS_CHECKOUT,
	FILL_IN_FIELDS,
	LOGIN,
	REGISTER,
	LOGOUT,
	GET_COUNTRIES,
	SELECT_COUNTRY,
} from '../constants/actionTypes';

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
			countries: action.payload.countries,
		};
	case SELECT_COUNTRY:
		return {
			...state,
			country: action.country,
			province: state.countries.filter((country) =>
				country.id === action.country)[0].available_regions,
		};
	case LOGIN:
	case REGISTER:
	case LOGOUT:
		return {};
	default:
		return state;
	}
};
