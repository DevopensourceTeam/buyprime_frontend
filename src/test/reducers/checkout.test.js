/**
 * @desc Import Redcuer
 */
import checkout from '../../reducers/checkout';

/**
 * @desc Import action types
 */
import {
	CHANGE_INPUT_CHECKOUT,
	SHOW_ERRORS_CHECKOUT,
	FILL_IN_FIELDS,
	LOGIN,
	REGISTER,
	LOGOUT,
	GET_COUNTRIES,
	SELECT_COUNTRY,
	SELECT_PROVINCE,
	SHIPPING_ADDRESS,
	SHIPPING_METHODS,
	PAY_METHODS,
} from '../../constants/actionTypes';

describe('Checkout Reducer', () => {
	it('Checkout initial state', () => {
		expect(checkout(undefined, {})).toEqual({});
	});

	it('Checkout CHANGE_INPUT_CHECKOUT', () => {
		expect(checkout({}, {
			type: CHANGE_INPUT_CHECKOUT,
			key: 'company',
			value: 'Devopensource',
		})).toEqual({
			company: 'Devopensource',
		});
	});

	it('Checkout SHOW_ERRORS_CHECKOUT', () => {
		expect(checkout({}, {
			type: SHOW_ERRORS_CHECKOUT,
			errors: ['error1', 'error2'],
		})).toEqual({
			errorsCheckout: ['error1', 'error2'],
		});
	});

	it('Checkout FILL_IN_FIELDS', () => {
		expect(checkout({}, {
			type: FILL_IN_FIELDS,
			user: {
				email: 'dani@gmail.com',
				firstname: 'Dani',
				lastname: 'Ortiz',
			},
		})).toEqual({
			email: 'dani@gmail.com',
			fname: 'Dani',
			lname: 'Ortiz',
		});
	});

	it('Checkout GET_COUNTRIES', () => {
		expect(checkout({}, {
			type: GET_COUNTRIES,
			payload: {
				countries: ['country3', 'country1', 'country2'],
			},
		})).toEqual({
			countries: ['country1', 'country2', 'country3'],
		});
	});

	it('Checkout SELECT_COUNTRY', () => {
		expect(checkout({
			countries: [{id: 'ES',
				full_name_english: 'Spain',
				available_regions: ['Alicante', 'Valencia']}],
		}, {
			type: SELECT_COUNTRY,
			country: 'ES',
		})).toEqual({
			countries: [{id: 'ES',
				full_name_english: 'Spain',
				available_regions: ['Alicante', 'Valencia']}],
			country: 'ES',
			countryName: 'Spain',
			provinces: ['Alicante', 'Valencia'],
		});

		expect(checkout({
			countries: [{id: 'ES',
				full_name_english: 'Spain',
				available_regions: ['Alicante', 'Valencia']}],
		}, {
			type: SELECT_COUNTRY,
			country: false,
		})).toEqual({
			countries: [{id: 'ES',
				full_name_english: 'Spain',
				available_regions: ['Alicante', 'Valencia']}],
			country: false,
			countryName: '',
			provinces: [],
		});
	});

	it('Checkout SELECT_PROVINCE', () => {
		expect(checkout({
			provinces: [{id: 'AL', name: 'Alicante'}, {id: 'VA', name: 'Valencia'}],
		}, {
			type: SELECT_PROVINCE,
			province: 'AL',
		})).toEqual({
			provinces: [{id: 'AL', name: 'Alicante'}, {id: 'VA', name: 'Valencia'}],
			provinceId: 'AL',
			provinceName: 'Alicante',
		});

		expect(checkout({
			provinces: [{id: 'AL', name: 'Alicante'}, {id: 'VA', name: 'Valencia'}],
		}, {
			type: SELECT_PROVINCE,
			province: false,
		})).toEqual({
			provinces: [{id: 'AL', name: 'Alicante'}, {id: 'VA', name: 'Valencia'}],
			provinceId: false,
			provinceName: '',
		});
	});

	it('Checkout SHIPPING_ADDRESS', () => {
		expect(checkout({}, {
			type: SHIPPING_ADDRESS,
			payload: {
				methods: 'Shipping Methods',
			},
			address: 'Shipping Address',
		})).toEqual({
			shipMethods: 'Shipping Methods',
			shipAddress: 'Shipping Address',
			errorsCheckout: [],
		});
	});

	it('Checkout SHIPPING_METHODS', () => {
		expect(checkout({}, {
			type: SHIPPING_METHODS,
			payload: {
				methods: {
					payment_methods: 'Payment Methods',
					totals: 'Totals',
				},
			},
			props: {
				history: {
					push: (url) => {
						return url;
					},
				},
			},
		})).toEqual({
			payMethods: 'Payment Methods',
			totals: 'Totals',
		});
	});

	it('Checkout PAY_METHODS', () => {
		expect(checkout({}, {
			type: PAY_METHODS,
			props: {
				history: {
					push: (url) => {
						return url;
					},
				},
			},
		})).toEqual({});
	});

	it('Checkout LOGIN, REGISTER, LOGOUT', () => {
		expect(checkout({}, {type: LOGIN})).toEqual({});
		expect(checkout({}, {type: REGISTER})).toEqual({});
		expect(checkout({}, {type: LOGOUT})).toEqual({});
	});
});
