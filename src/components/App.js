import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Video from './Video/Video';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart';
import PersonalData from './Checkout/PersonalData';
import Payment from './Checkout/Payment';
import './App.css';

/**
 * @desc Import constants
 */
import {
	APP_LOAD,
	APP_LOADU,
	USER_INFO,
	LOGOUT,
} from '../constants/actionTypes';
import agent from '../agent';

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
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @param {*} props
 * @return {*}
 */
const mapDispatchToProps = (dispatch, props) => ({
	/**
	 * @function onLoad
	 * @desc Charge the app
	 * @param {String} id
	 * @param {String} token
	 * @return {*}
	 */
	onLoad: (id) =>
		dispatch({type: APP_LOAD, payload: agent.Cart.idCart(id)}),

	/**
	 * @function onLoad
	 * @desc Charge the app
	 * @return {*}
	 */
	onLoadU: () =>
		dispatch({type: APP_LOADU}),

	/**
	 * @function infoUser
	 * @desc Get personal info of the user
	 * @param {String} token
	 * @return {*}
	 */
	infoUser: (token) =>
		dispatch({type: USER_INFO, payload: agent.Auth.infoUser(token)}),
	/**
	 * @function logout
	 * @desc Clear all information of the user
	 * @return {*}
	 */
	logout: () =>
		dispatch({type: LOGOUT, props}),
});

/**
 * @class App
 */
class App extends React.Component {
	/**
	 * @function componentDidMount
	 * @desc Load the app
	 */
	componentDidMount() {
		if (this.props.userInfo) {
			this.props.onLoad(this.props.userInfo.id);
		} else {
			this.props.onLoadU();
		}
	}

	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		if (this.props.appLoaded) {
			return (
				<div>
					<Header logout={this.props.logout} />
					<Switch>
						<Route exact path="/" component={Home}
							onLoad={this.props.onLoad}/>
						<Route path="/video" component={Video} />
						<Route exact path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/cart" component={Cart} />
						<Route path="/checkout/personaldata" component={PersonalData} />
						<Route path="/checkout/payment" component={Payment}
							history={this.props.history}/>
					</Switch>
				</div>
			);
		}
		return (
			<div className="App">
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

