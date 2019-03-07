import {
	APP_LOAD,
} from '../constants/actionTypes';

const defaultState = {
	appName: 'Magestreaming',
};

export default (state = defaultState, action) => {
	switch (action.type) {
	case APP_LOAD:
		return {
			...state,
			appLoaded: true,
		};
	default:
		return state;
	}
};
