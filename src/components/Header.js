import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AMenu from './Menu';

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
 * @class Header
 */
class Header extends React.Component {
	/**
	 * @function render
	 * @return {JSX} JSX del Header
	 */
	render() {
		let nproducts = 0;
		if (this.props.cartItems.length > 1) {
			this.props.cartItems.map((item) => {
				nproducts = nproducts + item.qty;
				return true;
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

export default connect(mapStateToProps)(Header);
