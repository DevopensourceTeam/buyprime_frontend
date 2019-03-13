/**
 * @desc import constants
 */
import {
	APP_LOAD,
	SHOW_SIDEBAR,
} from '../constants/actionTypes';

/**
 * @desc Default state from all the application web.
 */
const defaultState = {
	appName: 'Magestreaming',
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
	default:
		return state;
	}
};
