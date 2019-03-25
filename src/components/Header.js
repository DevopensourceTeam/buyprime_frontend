import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AMenu from './Menu';

/**
 * @desc Import constants
 */
import {
	LOGOUT,
} from '../constants/actionTypes';

/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	return {
		...state.common,
		cartItems: state.cart.cartItems,
	};
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @param {*} props
 * @return {*}
 */
const mapDispatchToProps = (dispatch, props) => ({
	/**
	 * @function logout
	 * @desc Clear all information of the user
	 * @return {*}
	 */
	logout: () =>
		dispatch({type: LOGOUT, props}),
});

/**
 * @class Header
 */
class Header extends React.Component {
	/**
	 * @function render
	 * @return {JSX} JSX del Header
	 */
	render() {
		let nproducts;
		if (this.props.cartItems.length > 1) {
			nproducts = this.props.cartItems.reduce((prodAn, prodAc, i) => {
				return prodAn.qty + prodAc.qty;
			});
		} else if (this.props.cartItems.length > 0) {
			nproducts = this.props.cartItems[0].qty;
		} else {
			nproducts = 0;
		}

		return (
			<nav className="p-3 d-flex justify-content-around shadow-sm">
				<section>
					<Link to="/" className="nav-brand">
						<label className="mb-0 c-pointer">{this.props.appName}</label>
					</Link>
				</section>
				<section className="text-center">
					<img src="logo.svg" alt="Page logo" width="16%" />
				</section>
				<AMenu user={this.props.userInfo}
					logout={this.props.logout}
					nproducts={nproducts} />
			</nav>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
