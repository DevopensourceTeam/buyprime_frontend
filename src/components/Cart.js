import React from 'react';
import {connect} from 'react-redux';

/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {*}
 */
const mapStateToProps = (state) => {
	return {
		...state,
	};
};

/**
 * @function mapDisptachToProps
 * @param {Object} dispatch
 * @return {*}
 */
const mapDisptachToProps = (dispatch) => ({
	getProducts: (products) =>
		console.log(products),
});

/**
 * @class Cart
 */
class Cart extends React.Component {
	/**
	 * @function componentDidMount
	 */
	componentDidMount() {
		this.props.getProducts('Products');
	}

	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		return (
			<label>Cart</label>
		);
	}
}

export default connect(mapStateToProps, mapDisptachToProps)(Cart);
