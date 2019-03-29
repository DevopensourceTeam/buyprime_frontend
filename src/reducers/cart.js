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
			cartItemsCP: fItems,
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
			cartItemsCP: AItems,
		};
	case REMOVE_ITEM_CART:
		const RItems = action.payload.state ? state.cartItems.filter((item) =>
			item.item_id !== action.idItem) : state.cartItems;
		return {
			...state,
			cartItems: RItems,
			cartItemsCP: RItems,
		};
	case CHANGE_QTY_CART:
		let changeQty = state.cartItems;
		const index = state.cartItems.map((prod) => prod.item_id)
			.indexOf(action.idItem);

		changeQty = changeQty.filter((prod) =>
			prod.item_id !== action.idItem);

		const changeProd = state.cartItems.filter((prod) =>
			prod.item_id === action.idItem)[0];

		if (action.operator === '+') {
			changeProd.qty = changeProd.qty + 1;
		} else {
			changeProd.qty = changeProd.qty - 1;
		}
		changeQty.splice(index, 0, changeProd);

		return {
			...state,
			cartItems: changeQty,
		};
	default:
		return state;
	}
};
