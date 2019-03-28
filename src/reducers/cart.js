/**
 * @desc Import the constants
 */
import {
	ADD_ITEM_CART,
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
	LOAD_CART,
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
		return {
			...state,
			cartItems: stateCart.length > 0 ?
				[...stateCart.filter((prod) =>
					prod.item_id !== action.payload.product.item_id),
				action.payload.product]:
				[action.payload.product],
		};
	case REMOVE_ITEM_CART:
		localStorage.setItem('cart', JSON.stringify(
			state.cartItems.filter((prod) =>
				prod.id !== action.productid)));
		return {
			...state,
			cartItems: state.cartItems.filter((prod) =>
				prod.id !== action.productid),
		};
	case CHANGE_QTY_CART:
		let changeQty = state.cartItems;
		const index = state.cartItems.map((prod) => prod.id)
			.indexOf(action.productid);

		changeQty = changeQty.filter((prod) =>
			prod.id !== action.productid);

		const changeProd = state.cartItems.filter((prod) =>
			prod.id === action.productid)[0];

		if (action.operator === '+') {
			changeProd.qty = changeProd.qty + 1;
		} else {
			changeProd.qty = changeProd.qty - 1;
		}
		changeQty.splice(index, 0, changeProd);

		localStorage.setItem('cart', JSON.stringify(changeQty));
		return {
			...state,
			cartItems: changeQty,
		};
	case LOAD_CART:
		return {
			...state,
			cartItems: JSON.parse(localStorage.getItem('cart')),
		};
	default:
		return state;
	}
};
