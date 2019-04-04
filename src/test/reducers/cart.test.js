/**
 * @desc Import Redcuer
 */
import cart from '../../reducers/cart';

/**
 * @desc Import action types
 */
import {
	ADD_ITEM_CART,
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
	APP_LOAD,
	APP_LOADU,
	PAY_METHODS,
	CHANGE_BUTTON_STATE,
} from '../../constants/actionTypes';

describe('Cart Reducer', () => {
	it('Cart initial state', () => {
		expect(cart(undefined, {
			cartItems: [],
			buttAddDisabled: false,
		})).toEqual({
			cartItems: [],
			buttAddDisabled: false,
		});
	});

	it('Cart APP_LOAD', () => {
		expect(cart({}, {
			type: APP_LOAD,
			payload: {
				items: [{item: {item_id: '1'}, image: ['image']}],
				idCart: 1,
			},
		})).toEqual({
			cartItems: [{item_id: '1', image: 'image'}],
			idCart: 1,
		});
	});

	it('Cart APP_LOADU', () => {
		expect(cart({}, {
			type: APP_LOADU,
			payload: {
				items: [{item: {item_id: '1'}, image: ['image']}],
				idCart: 1,
			},
		})).toEqual({
			cartItems: [{item_id: '1', image: 'image'}],
			idCart: 1,
		});
	});

	it('Cart ADD_ITEM_CART', () => {
		expect(cart({
			cartItems: [{item_id: '1', image: 'image'}],
		}, {
			type: ADD_ITEM_CART,
			payload: {
				product: {item_id: '2', image: 'image'},
			},
			test: true,
		})).toEqual({
			cartItems: [{item_id: '1', image: 'image'},
				{item_id: '2', image: 'image'}],
			buttAddDisabled: true,
		});

		expect(cart({cartItems: []}, {
			type: ADD_ITEM_CART,
			payload: {
				product: {item_id: '2', image: 'image'},
			},
			test: true,
		})).toEqual({
			cartItems: [{item_id: '2', image: 'image'}],
			buttAddDisabled: true,
		});
	});

	it('Cart REMOVE_ITEM_CART', () => {
		expect(cart({
			cartItems: [{item_id: '1', image: 'image'},
				{item_id: '2', image: 'image'}],
		}, {
			type: REMOVE_ITEM_CART,
			payload: {
				state: true,
			},
			idItem: '1',
		})).toEqual({
			cartItems: [{item_id: '2', image: 'image'}],
		});

		expect(cart({
			cartItems: [{item_id: '1', image: 'image'},
				{item_id: '2', image: 'image'}],
		}, {
			type: REMOVE_ITEM_CART,
			payload: {
				state: false,
			},
			idItem: '1',
		})).toEqual({
			cartItems: [{item_id: '1', image: 'image'},
				{item_id: '2', image: 'image'}],
		});
	});

	it('Cart CHANGE_QTY_CART', () => {
		expect(cart({
			cartItems: [{item_id: '1', image: 'image', qty: 1},
				{item_id: '2', image: 'image', qty: 1}],
		}, {
			type: CHANGE_QTY_CART,
			payload: {
				item: {item_id: '2', image: 'image', qty: 2},
			},
			test: true,
		})).toEqual({
			cartItems: [{item_id: '1', image: 'image', qty: 1},
				{item_id: '2', image: 'image', qty: 2}],
		});
	});

	it('Cart CHANGE_BUTTON_STATE', () => {
		expect(cart({}, {
			type: CHANGE_BUTTON_STATE,
		})).toEqual({
			buttAddDisabled: false,
		});
	});

	it('Cart PAY_METHODS', () => {
		expect(cart({}, {
			type: PAY_METHODS,
		})).toEqual({
			cartItems: [],
		});
	});
});
