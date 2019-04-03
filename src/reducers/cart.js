import toastr from 'toastr';

/**
 * @desc Import the constants
 */
import {
	TOASTR_OPTIONSL,
	ADD_ITEM_CART,
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
	APP_LOAD,
	APP_LOADU,
	PAY_METHODS,
	CHANGE_BUTTON_STATE,
} from '../constants/actionTypes';
toastr.options = TOASTR_OPTIONSL;

/**
 * @desc Default state from Cart.
 */
const defaultState = {
	cartItems: [],
	buttAddDisabled: false,
};

export default (state = defaultState, action) => {
	switch (action.type) {
	/**
	 * @desc Charge the app when the user is loggedin
	 */
	case APP_LOAD:
		let fItems = [];
		action.payload.items.map((item) => {
			item.item.image = item.image[0];
			fItems.push(item.item);
			return true;
		});

		return {
			...state,
			cartItems: fItems,
			idCart: action.payload.idCart,
		};
	/**
	 * @desc Charge the app when the user isn't loggedin.
	 */
	case APP_LOADU:
		fItems = [];
		action.payload.items.map((item) => {
			item.item.image = item.image[0];
			fItems.push(item.item);
			return true;
		});
		localStorage.setItem('idGCart', action.payload.idCart);
		return {
			...state,
			cartItems: fItems,
			idCart: action.payload.idCart,
		};
	/**
     * @desc Save in array id and quantity of the products
     */
	case ADD_ITEM_CART:
		const stateCart = state.cartItems;
		const AItems = stateCart.length > 0 ?
			[...stateCart.filter((prod) =>
				prod.item_id !== action.payload.product.item_id),
			action.payload.product]:
			[action.payload.product];
		if (stateCart.length < 1) {
			window.location.reload();
		}
		toastr.success('ADDED ITEM');
		return {
			...state,
			cartItems: AItems,
			buttAddDisabled: true,
		};
	/**
	 * @desc Remove a item of the Cart
	 */
	case REMOVE_ITEM_CART:
		const RItems = action.payload.state ? state.cartItems.filter((item) =>
			item.item_id !== action.idItem) : state.cartItems;
		return {
			...state,
			cartItems: RItems,
		};
	/**
	 * @desc Change the quantity of a item
	 */
	case CHANGE_QTY_CART:
		return {
			...state,
			stateCart: state.cartItems.map((item) => {
				if (item.item_id === action.payload.item.item_id) {
					return action.payload.item;
				}
				return item;
			}),
		};
	/**
	 * Change state to enable o disable the button.
	 */
	case CHANGE_BUTTON_STATE:
		return {
			...state,
			buttAddDisabled: false,
		};
	case PAY_METHODS:
		return {cartItems: []};
	default:
		return state;
	}
};
