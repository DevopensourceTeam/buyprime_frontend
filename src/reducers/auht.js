/**
 * @desc import constants
 */
import {
	CHANGE_INPUT_AUTH,
	CHANGE_TYPE_PASS,
	SHOW_ERRORS_LOGIN,
	SHOW_ERRORS_REGISTER,
	LOGIN,
	REGISTER,
} from '../constants/actionTypes';

/**
 * @desc Default state from auth.
 */
const defaultState = {
	passLogType: 'password',
	passRegType: 'password',
	passRegCType: 'password',
};

export default (state = defaultState, action) => {
	switch (action.type) {
	case CHANGE_INPUT_AUTH:
		return {
			...state,
			[action.key]: action.value,
		};
	case CHANGE_TYPE_PASS:
		return {
			...state,
			[action.key]: action.passType,
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
			emailL: '',
			passwordL: '',
			errorsLogin: [],
		};
	case REGISTER:
		return {
			...state,
			fname: '',
			lname: '',
			emailR: '',
			passwordR: '',
			cpasswordR: '',
			errorsRegister: [],
		};
	default:
		return state;
	}
};
