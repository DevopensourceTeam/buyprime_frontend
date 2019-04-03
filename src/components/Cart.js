import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ProductListCart from './ProductListCart';

/**
 * @desc Import constants
 */
import {
	REMOVE_ITEM_CART,
	CHANGE_QTY_CART,
} from '../constants/actionTypes';
import agent from '../agent';

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
	/**
	 * @function removeItem
	 * @desc Remove a item of the cart.
	 * @param {Integer} idItem
	 * @param {Integer} idCart
	 * @return {*}
	 */
	removeItem: (idItem, idCart) =>
		dispatch({type: REMOVE_ITEM_CART,
			payload: agent.Cart.removeItem(idItem, idCart), idItem}),

	/**
	 * @function changeQty
	 * @desc Change the quantity of item of the cart.
	 * @param {Object} item
	 * @return {*}
	 */
	changeQty: (item) =>
		dispatch({type: CHANGE_QTY_CART,
			payload: agent.Cart.updateItem(item)}),
});

/**
 * @class Cart
 */
class Cart extends React.Component {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.removeItem = (idItem) => {
			this.props.removeItem(idItem, this.props.idCart);
		};
		this.changeQty = (item, qty) => {
			item.qty = qty > 0 ? qty : 1;
			this.props.changeQty(item);
		};
	}
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
						removeItem={this.removeItem}
						changeQty={this.changeQty} />
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
						<Link to="/personaldata" className="nav-brand">
							<button className="btn-primary btn-lg" disabled={!orderTotal}>
							Proceed to Checkout</button>
						</Link>
					</section>
				</article>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDisptachToProps)(Cart);
