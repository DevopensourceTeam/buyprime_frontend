/**
 * @desc Import the constants
 */
import {
	ADD_ITEM_CART,
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
} from '../constants/actionTypes';

export default (state = {cartItems: []}, action) => {
	switch (action.type) {
	/**
     * @desc Save in array id and quantity of the products
     */
	case ADD_ITEM_CART:
		let stateCart = state.cartItems;
		stateCart.map((prod) => {
			if (prod.id === action.product.id) {
				action.product.qty = prod.qty + 1;
				stateCart = [...stateCart.filter((prod) =>
					prod.id !== action.product.id), action.product];
			} else if (stateCart.filter((prod) =>
				prod.id === action.product.id).length < 1) {
				stateCart = [...stateCart, action.product];
			}
			return stateCart;
		});
		return {
			...state,
			cartItems: stateCart.length > 0 ? stateCart : [action.product],
		};
	case REMOVE_ITEM_CART:
		return {
			...state,
			cartItems: state.cartItems.filter((prod) =>
				prod.id !== action.productid),
		};
	case CHANGE_QTY_CART:
		const changeProd = state.cartItems.filter((prod) =>
			prod.id === action.productid)[0];
		if (action.operator === '+') {
			changeProd.qty = changeProd.qty + 1;
		} else {
			changeProd.qty = changeProd.qty - 1;
		}
		return {
			...state,
			cartItems: [...state.cartItems.filter((prod) =>
				prod.id !== action.productid), changeProd],
		};
	default:
		return state;
	}
};
