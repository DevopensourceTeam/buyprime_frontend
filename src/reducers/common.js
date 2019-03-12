import {
	APP_LOAD,
	SHOW_SIDEBAR,
} from '../constants/actionTypes';

const defaultState = {
	appName: 'Magestreaming',
	stateSidebar: false,
};

export default (state = defaultState, action) => {
	switch (action.type) {
	case APP_LOAD:
		return {
			...state,
			appLoaded: true,
		};
	case SHOW_SIDEBAR:
		return {
			...state,
			stateSidebar: action.state,
		};
	default:
		return state;
	}
};
