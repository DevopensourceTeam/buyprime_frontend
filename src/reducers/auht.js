import toastr from 'toastr';

/**
 * @desc import constants
 */
import {
	TOASTR_OPTIONS,
	CHANGE_INPUT_AUTH,
	CHANGE_TYPE_PASS,
	SHOW_ERRORS_LOGIN,
	SHOW_ERRORS_REGISTER,
	LOGIN,
	REGISTER,
} from '../constants/actionTypes';
toastr.options = TOASTR_OPTIONS;

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
		if (action.payload.error) {
			return {
				...state,
				errorsRegister: [{key: 'Error', error: action.payload.error}],
			};
		} else {
			toastr.success('Successful Registration', 'REGISTER');
			action.props.history.push('/');

			return {
				...state,
				errorsRegister: [],
				fname: '',
				lname: '',
				emailR: '',
				passwordR: '',
				cpasswordR: '',
			};
		}
	default:
		return state;
	}
};
