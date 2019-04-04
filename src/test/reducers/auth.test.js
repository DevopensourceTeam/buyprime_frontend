/**
 * @desc Import Redcuer
 */
import auth from '../../reducers/auth';

/**
 * @desc Import action types
 */
import {
	CHANGE_INPUT_AUTH,
	CHANGE_TYPE_PASS,
	SHOW_ERRORS_LOGIN,
	SHOW_ERRORS_REGISTER,
	LOGIN,
	REGISTER,
	UNMOUNT_LOGIN,
	UNMOUNT_REGISTER,
} from '../../constants/actionTypes';

describe('Auth Reducer', () => {
	it('Auth initial state', () => {
		expect(auth(undefined, {
			passLogType: 'password',
			passRegType: 'password',
			passRegCType: 'password',
		})).toEqual({
			passLogType: 'password',
			passRegType: 'password',
			passRegCType: 'password',
		});
	});

	it('Auth CHANGE_INPUT_AUTH', () => {
		expect(auth({}, {
			type: CHANGE_INPUT_AUTH,
			key: 'email',
			value: 'daniortiz@gmail.com',
		})).toEqual({
			email: 'daniortiz@gmail.com',
		});
	});

	it('Auth CHANGE_TYPE_PASS', () => {
		expect(auth({}, {
			type: CHANGE_TYPE_PASS,
			key: 'passLogType',
			passType: 'text',
		})).toEqual({
			passLogType: 'text',
		});
	});

	it('Auth SHOW_ERRORS_LOGIN', () => {
		expect(auth({}, {
			type: SHOW_ERRORS_LOGIN,
			errors: ['error'],
		})).toEqual({
			errorsLogin: ['error'],
		});
	});

	it('Auth SHOW_ERRORS_REGISTER', () => {
		expect(auth({}, {
			type: SHOW_ERRORS_REGISTER,
			errors: ['error'],
		})).toEqual({
			errorsRegister: ['error'],
		});
	});

	it('Auth LOGIN', () => {
		expect(auth({}, {
			type: LOGIN,
			payload: {
				error: null,
			},
			props: {
				history: {
					push: (url) => {
						return url;
					},
				},
			},
			test: true,
		})).toEqual({
			emailL: '',
			passwordL: '',
			errorsLogin: [],
			passLogType: 'password',
		});
		expect(auth({}, {
			type: LOGIN,
			payload: {
				error: 'Error',
			},
			test: true,
		})).toEqual({
			errorsLogin: [{key: 'Error', error: 'Error'}],
		});
	});

	it('Auth REGISTER', () => {
		expect(auth({}, {
			type: REGISTER,
			payload: {
				error: null,
			},
			props: {
				history: {
					push: (url) => {
						return url;
					},
				},
			},
			test: true,
		})).toEqual({
			errorsRegister: [],
			fname: '',
			lname: '',
			emailR: '',
			passwordR: '',
			cpasswordR: '',
			passRegType: 'password',
			passRegCType: 'password',
		});
		expect(auth({}, {
			type: REGISTER,
			payload: {
				error: 'Error',
			},
			test: true,
		})).toEqual({
			errorsRegister: [{key: 'Error', error: 'Error'}],
		});
	});

	it('Auth UNMOUNT_LOGIN', () => {
		expect(auth({}, {
			type: UNMOUNT_LOGIN,
		})).toEqual({
			emailL: '',
			passwordL: '',
			errorsLogin: [],
			passLogType: 'password',
		});
	});

	it('Auth UNMOUNT_REGISTER', () => {
		expect(auth({}, {
			type: UNMOUNT_REGISTER,
		})).toEqual({
			errorsRegister: [],
			fname: '',
			lname: '',
			emailR: '',
			passwordR: '',
			cpasswordR: '',
			passRegType: 'password',
			passRegCType: 'password',
		});
	});
});
