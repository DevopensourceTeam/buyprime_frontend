
import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';

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
			<section>
				<form onSubmit={this.paymentMethods()}>
					<fieldset className="d-flex flex-column">
						<p className="m-0 mt-3 text-muted h3">Payment Methods</p>
						<hr className="mt-2 mb-2" />
						{
							this.props.payMethods ?
								this.props.payMethods.map((method, i) => {
									return <section key={i} className="form-check ml-3">
										<input
											className="form-check-input"
											type="radio" name="paymentRadio"
											value={method.code}
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
						className="btn btn-primary btn-lg"
						disabled={!this.props.inputPayMethod}>
						Place Order</button>
				</form>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
