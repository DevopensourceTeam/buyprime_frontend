import React from 'react';
import {connect} from 'react-redux';
import ProductListCart from './ProductListCart';

import {
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
} from '../constants/actionTypes';
/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => {
	return {
		...state.cart,
	};
};

/**
 * @function mapDisptachToProps
 * @param {Object} dispatch
 * @return {*}
 */
const mapDisptachToProps = (dispatch) => ({
	removeItem: (productid) =>
		dispatch({type: REMOVE_ITEM_CART, productid}),
	changeQty: (productid, operator) =>
		dispatch({type: CHANGE_QTY_CART, productid, operator}),
});

/**
 * @class Cart
 */
class Cart extends React.Component {
	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		let orderTotal;
		if (this.props.cartItems.length > 1) {
			orderTotal = this.props.cartItems.reduce((prodAn, prodAc, i) => {
				return (prodAn.qty * prodAn.price) + (prodAc.qty * prodAc.price);
			});
		} else if (this.props.cartItems.length > 0) {
			orderTotal = this.props.cartItems[0].qty * this.props.cartItems[0].price;
		}
		return (
			<article className="mt-5 ml-5 mr-5">
				<h3>Shopping Cart</h3>
				<section>
					<ProductListCart
						products={this.props.cartItems}
						removeItem={this.props.removeItem}
						changeQty={this.props.changeQty}
						orderTotal={orderTotal} />
				</section>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDisptachToProps)(Cart);
