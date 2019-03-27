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
		let orderTotal = 0;
		if (this.props.cartItems.length > 1) {
			this.props.cartItems.map((item) => {
				orderTotal = orderTotal + (item.qty * item.price);
				return true;
			});
		} else if (this.props.cartItems.length > 0) {
			orderTotal = this.props.cartItems[0].qty * this.props.cartItems[0].price;
		}
		return (
			<article className="mt-5 ml-5 mr-5">
				<h3>Shopping Cart</h3>
				<article className="d-flex justify-content-between
				mt-4 align-items-center">
					<ProductListCart
						products={this.props.cartItems}
						removeItem={this.props.removeItem}
						changeQty={this.props.changeQty} />
					<section className="
						d-flex flex-column align-items-center
						border border-secondary
						rounded p-4 w-50 mb-3 fit-content">
						<section>
							<h3>Cart Summary</h3>
						</section>
						<hr className="border-dark w-100" />
						<section>
							<p><strong>Order Total</strong> {orderTotal} $</p>
						</section>
						<button className="btn-primary btn-lg">Proceed to Checkout</button>
					</section>
				</article>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDisptachToProps)(Cart);
