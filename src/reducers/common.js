/**
 * @desc import constants
 */
import {
	APP_LOAD,
	SHOW_SIDEBAR,
	LOGIN,
	REGISTER,
	LOGOUT,
} from '../constants/actionTypes';

/**
 * @desc Default state from all the application web.
 */
const defaultState = {
	appName: 'BuyPrime',
	stateSidebar: true,
};

export default (state = defaultState, action) => {
	switch (action.type) {
	/**
	 * @desc Charge the app
	 */
	case APP_LOAD:
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
	case LOGIN:
	case REGISTER:
		return {
			...state,
			userInfo: action.payload.success ?
				action.payload.success.user : undefined,
			userToken: action.payload.success ?
				action.payload.success.token : undefined,
		};
	case LOGOUT:
		action.props.history.push('/');
		return {
			...state,
			userInfo: null,
			userToken: null,
		};
	default:
		return state;
	}
};
