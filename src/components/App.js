import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Video from './Video';
import './App.css';

import {
	APP_LOAD,
} from '../constants/actionTypes';

const mapStateToProps = (state) => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
	};
};

const mapDispatchToProps = (dispatch) => ({
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
						appName={this.props.appName} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/video" component={Video} />
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

