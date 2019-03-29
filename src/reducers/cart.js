/**
 * @desc Import the constants
 */
import {
	ADD_ITEM_CART,
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
	APP_LOAD,
} from '../constants/actionTypes';

export default (state = {cartItems: []}, action) => {
	switch (action.type) {
	/**
	 * @desc Charge the app
	 */
	case APP_LOAD:
		const fItems = [];
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
     * @desc Save in array id and quantity of the products
     */
	case ADD_ITEM_CART:
		const stateCart = state.cartItems;
		const AItems = stateCart.length > 0 ?
			[...stateCart.filter((prod) =>
				prod.item_id !== action.payload.product.item_id),
			action.payload.product]:
			[action.payload.product];
		return {
			...state,
			cartItems: AItems,
		};
	case REMOVE_ITEM_CART:
		const RItems = action.payload.state ? state.cartItems.filter((item) =>
			item.item_id !== action.idItem) : state.cartItems;
		return {
			...state,
			cartItems: RItems,
		};
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
	default:
		return state;
	}
};
