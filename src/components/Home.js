import React from 'react';
import {connect} from 'react-redux';

/**
 * @function mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	return {

	};
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @return {*}
 */
const mapDispatchToProps = (dispatch) => ({
});

/**
 * @class Home
 */
class Home extends React.Component {
	/**
	 * @function render
	 * @return {JSX} JSX del Home
	 */
	render() {
		return (
			<article className="pt-3 text-center">
				<h1>Home</h1>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
