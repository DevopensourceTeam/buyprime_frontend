/**
 * @desc import constants
 */
import {
	CHANGE_INPUT_AUTH,
	SHOW_ERRORS_LOGIN,
	SHOW_ERRORS_REGISTER,
	LOGIN,
	REGISTER,
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
	case CHANGE_INPUT_AUTH:
		return {
			...state,
			[action.key]: action.value,
		};
	case SHOW_ERRORS_LOGIN:
		return {
			...state,
			errorsLogin: action.errors,
		};
	case SHOW_ERRORS_REGISTER:
		return {
			...state,
			errorsRegister: action.errors,
		};
	case LOGIN:
		return {
			...state,
			errorsLogin: [],
		};
	case REGISTER:
		return {
			...state,
			errorsRegister: [],
		};
	default:
		return state;
	}
};
