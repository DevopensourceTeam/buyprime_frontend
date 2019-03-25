/**
 * @desc Import the constants
 */
import {
	ADD_CART,
} from '../constants/actionTypes';

export default (state = {cartItems: []}, action) => {
	switch (action.type) {
	/**
     * @desc Save in array id and quantity of the products
     */
	case ADD_CART:
		let stateCart = state.cartItems;
		stateCart.filter((prod) => {
			if (prod.id === action.product.id) {
				action.product.qty = prod.qty + 1;
				stateCart = [...stateCart.filter((prod) =>
					prod.id !== action.product.id), action.product];
			} else {
				stateCart = [...stateCart, action.product];
			}
		});
		return {
			...state,
			cartItems: stateCart.length > 0 ? stateCart : [action.product],
		};
	default:
		return state;
	}
};
