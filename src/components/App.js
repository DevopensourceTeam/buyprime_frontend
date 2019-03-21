import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Video from './Video/Video';
import Login from './Auth/Login';
import Register from './Auth/Register';
import './App.css';

/**
 * @desc Import constants
 */
import {
	APP_LOAD,
} from '../constants/actionTypes';

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
 * @return {*}
 */
const mapDispatchToProps = (dispatch) => ({
	/**
	 * @function onLoad
	 * @desc Charge the app
	 * @return {*}
	 */
	onLoad: () =>
		dispatch({type: APP_LOAD}),
});

/**
 * @class App
 */
class App extends React.Component {
	/**
	 * @function componentDidMount
	 */
	componentDidMount() {
		this.props.onLoad();
	}

	/**
	 * @function render
	 * @return {JSX}
	 */
	render() {
		if (this.props.appLoaded) {
			return (
				<div>
					<Header
						appName={this.props.appName}
						user={this.props.userInfo} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/video" component={Video} />
						<Route exact path="/login" component={Login} />
						<Route path="/register" component={Register} />
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

