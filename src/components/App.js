import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Video from './Video/Video';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart';
import './App.css';

/**
 * @desc Import constants
 */
import {
	APP_LOAD,
	USER_INFO,
	LOAD_CART,
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
	 * @return {*}
	 */
	onLoad: () =>
		dispatch({type: APP_LOAD}),

	/**
	 * @function infoUser
	 * @desc Get personal info of the user
	 * @param {String} token
	 * @return {*}
	 */
	infoUser: (token) =>
		dispatch({type: USER_INFO, payload: agent.Auth.infoUser(token)}),
	/**
	 * @function loadCart
	 * @desc Get data from localStorage and save in store
	 * @return {*}
	 */
	loadCart: () =>
		dispatch({type: LOAD_CART}),
});

/**
 * @class App
 */
class App extends React.Component {
	/* eslint-disable */
	/**
	 * @function componentDidMount
	 * @desc If user exists get the personal data
	 */
	componentWillMount() {
		if (localStorage.getItem('token')) {
			this.props.infoUser(localStorage.getItem('token'));
		}
	}
	/* eslint-enable */
	/**
	 * @function componentDidMount
	 * @desc Load the app
	 */
	componentDidMount() {
		this.props.onLoad();
		if (localStorage.getItem('cart')) {
			this.props.loadCart();
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
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/video" component={Video} />
						<Route exact path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/cart" component={Cart} />
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

