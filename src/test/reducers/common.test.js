/**
 * @desc Import Redcuer
 */
import common from '../../reducers/common';

/**
 * @desc Import action types
 */
import {
	APP_LOAD,
	APP_LOADU,
	SHOW_SIDEBAR,
	LOGIN,
	REGISTER,
	USER_INFO,
	LOGOUT,
} from '../../constants/actionTypes';

describe('Common Reducer', () => {
	it('Common initial state', () => {
		expect(common(undefined, {})).toEqual({});
	});

	it('Common APP_LOAD', () => {
		expect(common(undefined, {
			type: APP_LOAD,
		})).toEqual({
			appLoaded: true,
		});
	});

	it('Common APP_LOADU', () => {
		expect(common(undefined, {
			type: APP_LOADU,
		})).toEqual({
			appLoaded: true,
		});
	});

	it('Common SHOW_SIDEBAR', () => {
		expect(common({
			appLoaded: true,
		}, {
			type: SHOW_SIDEBAR,
			state: true,
		})).toEqual({
			appLoaded: true,
			stateSidebar: true,
		});
	});

	it('Common LOGIN, REGISTER, USER_INFO', () => {
		expect(common({}, {
			type: LOGIN,
			payload: {
				success: {
					token: 'token',
					user: 'Dani',
				},
			},
		})).toEqual({
			userInfo: 'Dani',
			token: 'token',
		});

		expect(common({}, {
			type: REGISTER,
			payload: {
				success: false,
				error: true,
			},
		})).toEqual({
			userInfo: undefined,
			token: undefined,
		});

		expect(common({}, {
			type: USER_INFO,
			payload: {
				success: {
					token: undefined,
					user: 'Dani',
				},
			},
		})).toEqual({
			userInfo: 'Dani',
			token: undefined,
		});
	});

	it('Common LOGOUT', () => {
		expect(common({
			appLoaded: true,
			stateSidebar: true,
		}, {
			type: LOGOUT,
			props: {
				history: {
					push: (url) => {
						return url;
					},
				},
			},
		})).toEqual({
			appLoaded: true,
			stateSidebar: true,
			userInfo: null,
			token: null,
		});
	});
});
