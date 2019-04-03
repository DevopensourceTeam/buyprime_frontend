import React from 'react';
import {connect} from 'react-redux';

/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	return {
		...state.common,
		idCart: state.cart.idCart,
	};
};

/**
 * @class Home
 */
class Home extends React.Component {
	/**
	 * @function componentDidUpdate
	 * @desc Init a new cart if is login but, haven't a cart
	 * @param {*} prevProps
	 */
	componentDidMount() {
		if (!this.props.idCart && this.props.userInfo) {
			this.props.onLoad(this.props.userInfo.id);
		}
	}
	/**
	 * @function render
	 * @return {JSX} JSX del Home
	 */
	render() {
		return (
			<article className="pt-3 text-center">
				<h1>BuyPrime</h1>
			</article>
		);
	}
}

export default connect(mapStateToProps)(Home);
