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
	UNMOUNT_LOGIN,
	UNMOUNT_REGISTER,
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
	/**
	 * @desc When change the value of input in the Login or Register
	 */
	case CHANGE_INPUT_AUTH:
		return {
			...state,
			[action.key]: action.value,
		};
	/**
	 * @desc When change the value of input password in the Login or Register
	 */
	case CHANGE_TYPE_PASS:
		return {
			...state,
			[action.key]: action.passType,
		};
	/**
	 * @desc Save the errors what show in the Login
	 */
	case SHOW_ERRORS_LOGIN:
		return {
			...state,
			errorsLogin: action.errors,
		};
	/**
	 * @desc Save the errors what show in the Register
	 */
	case SHOW_ERRORS_REGISTER:
		return {
			...state,
			errorsRegister: action.errors,
		};
	/**
	 * @desc Save the errors what show in the Login of the backend or
	 * Clear data of the input and save user data and token
	 */
	case LOGIN:
		if (action.payload.error) {
			return {
				...state,
				errorsLogin: [{key: 'Error', error: action.payload.error}],
			};
		} else {
			toastr.success('Successful Login', 'LOGIN');

			action.props.history.push('/');

			return {
				...state,
				emailL: '',
				passwordL: '',
				errorsLogin: [],
				passLogType: 'password',
			};
		}
	/**
	 * @desc Save the errors what show in the Register of the backend or
	 * Clear data of the input and save user data and token
	 */
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
				passRegType: 'password',
				passRegCType: 'password',
			};
		}
	/**
	 * @desc Set default data component Login when unmount
	 */
	case UNMOUNT_LOGIN:
		return {
			...state,
			emailL: '',
			passwordL: '',
			errorsLogin: [],
			passLogType: 'password',
		};
	/**
	 * @desc Set default data component Register when unmount
	 */
	case UNMOUNT_REGISTER:
		return {
			...state,
			errorsRegister: [],
			fname: '',
			lname: '',
			emailR: '',
			passwordR: '',
			cpasswordR: '',
			passRegType: 'password',
			passRegCType: 'password',
		};
	default:
		return state;
	}
};
