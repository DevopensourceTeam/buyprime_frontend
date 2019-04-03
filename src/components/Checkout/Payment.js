
import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';
import ProductCheckout from './ProductCheckout';
import {Link} from 'react-router-dom';

/**
* @desc Import constants
*/
import {
	CHANGE_INPUT_CHECKOUT,
	PAY_METHODS,
} from '../../constants/actionTypes';

/**
 * @constant mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => ({
	...state.checkout,
	cartItems: state.cart.cartItems,
	idCart: state.cart.idCart,
});

const mapDispatchToProps = (dispatch, props) => ({
	/**
	 * @function changeInput
	 * @desc Save in store the changes of the input
	 * @param {String} key
	 * @param {String} value
	 * @return {*}
	 */
	changeInput: (key, value) =>
		dispatch({type: CHANGE_INPUT_CHECKOUT, key, value}),

	/**
	 * @function shippingMethods
	 * @param {Object} payment
	 * @param {Integer} idCart
	 * @return {*}
	 */
	paymentMethods: (payment, idCart) =>
		dispatch({type: PAY_METHODS,
			payload: agent.Checkout.fOrder(payment, idCart), props}),
});
/**
 * @class Payment
 */
class Payment extends React.Component {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.changeInput = (key) => (ev) => {
			this.props.changeInput(key, ev.target.value);
		};

		this.paymentMethods = () => (ev) => {
			ev.preventDefault();

			this.props.paymentMethods(this.props.inputPayMethod, this.props.idCart);
		};
	}

	/**
	 * @function componentDidMount
	 * @desc Check if client is sign in and have any items in cart
	 */
	componentDidMount() {
		window.scrollTo(0, 0);
		if (this.props.cartItems.length < 1) {
			this.props.history.push('/cart');
		} else if (!this.props.payMethods && !this.props.shipMethods) {
			this.props.history.push('/personaldata');
		}
	}

	/**
     * @function render
	 * @return {JSX}
     */
	render() {
		return (
			<section className="d-flex">
				<form className="w-50 p-3" onSubmit={this.paymentMethods()}>
					<fieldset className="d-flex flex-column">
						<p className="m-0 mt-3 text-muted h3">Payment Methods</p>
						<hr className="mt-2 mb-2" />
						{
							this.props.payMethods ?
								this.props.payMethods.map((method, i) => {
									return this.props.inputPayMethod === method.code?
										<section key={i} className="form-check ml-3 mb-2">
											<input
												className="form-check-input"
												type="radio" name="paymentRadio"
												value={method.code} checked={true}
												onChange={this.changeInput('inputPayMethod')}/>
											<label className="form-check-label">
												{method.title}
											</label>
										</section> :
										<section key={i} className="form-check ml-3 mb-2">
											<input
												className="form-check-input"
												type="radio" name="paymentRadio"
												value={method.code} checked={false}
												onChange={this.changeInput('inputPayMethod')}/>
											<label className="form-check-label">
												{method.title}
											</label>
										</section>;
								}) : ''
						}
					</fieldset>
					<button
						type="submit"
						className="btn btn-primary btn-lg mt-2"
						disabled={!this.props.inputPayMethod}>
						Place Order</button>
				</form>
				<section className="w-50">
					{
						this.props.totals ?
							<section className='mw-50 w-100 d-flex flex-column p-3'>
								<p className="m-0 text-muted h3">Order Summary</p>
								<hr className="mt-2 mb-2 w-100" />
								<p className="mb-2">
									Cart Subtotal ${this.props.totals.subtotal}</p>
								<p className="m-0">
									Shipping ${this.props.totals.shipping_amount}</p>
								<hr className="mt-2 mb-2 w-100" />
								<p>Order Total ${this.props.totals.grand_total}</p>
								<p className="h5 m-0">
									{this.props.totals.items.length} Items in Cart</p>
								<section className='d-flex flex-column align-items-center'>
									<ProductCheckout products={this.props.cartItems} />
								</section>
							</section>
							: ''
					}
					<section className="p-3">
						<section className="d-flex align-items-center">
							<p className="m-0 h4 w-100">Ship To:</p>
							<Link to="/personaldata">
								<i className="fas fa-pencil-alt mr-3
									c-pointer text-dark"></i>
							</Link>
						</section>
						<hr className="mt-2 mb-3 w-100" />
						<p>{this.props.fname}{this.props.lname}</p>
						<p>{this.props.street}</p>
						<p>{this.props.city}
							, {this.props.provinceName} {this.props.postalcode}</p>
						<p>{this.props.countryName}</p>
						<p>{this.props.phone}</p>
					</section>
					<section className="p-3">
						<section className="d-flex align-items-center">
							<p className="h4 m-0 w-100">Ship Method:</p>
							<Link to="/personaldata">
								<i className="fas fa-pencil-alt mr-3
									c-pointer text-dark"></i>
							</Link>
						</section>
						<hr className="mt-2 mb-3 w-100" />
						{this.props.inputShipMethod}
					</section>
				</section>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
