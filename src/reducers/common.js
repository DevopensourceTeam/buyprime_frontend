/**
 * @desc import constants
 */
import {
	APP_LOAD,
	APP_LOADU,
	SHOW_SIDEBAR,
	LOGIN,
	REGISTER,
	USER_INFO,
	LOGOUT,
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
	/**
	 * @desc Charge the app when the user is loggedin.
	 */
	case APP_LOAD:
		return {
			...state,
			appLoaded: true,
		};
	/**
	 * @desc Charge the app when the user isn't loggedin.
	 */
	case APP_LOADU:
		return {
			...state,
			appLoaded: true,
		};
	/**
	 * @desc State to determine whether or not the sidebar will be displayed.
	 */
	case SHOW_SIDEBAR:
		return {
			...state,
			stateSidebar: action.state,
		};
	/**
	 * @desc Save the token and user info
	 */
	case LOGIN:
	case REGISTER:
	case USER_INFO:
		if (action.payload.success) {
			localStorage.setItem('token', action.payload.success.token);
		}
		if (action.payload.error) {
			localStorage.removeItem('token');
		}
		return {
			...state,
			userInfo: action.payload.success ?
				action.payload.success.user : undefined,
			token: action.payload.success ?
				action.payload.success.token : undefined,
		};
	/**
	 * Remove all the info and token of the user
	 */
	case LOGOUT:
		localStorage.removeItem('token');
		action.props.history.push('/');
		return {
			...state,
			userInfo: null,
			token: null,
		};
	default:
		return state;
	}
};
