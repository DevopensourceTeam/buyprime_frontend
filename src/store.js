import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import agent from './agent';
import {promiseMiddleware} from './middleware';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const saveLocal = () => {
	return new Promise((resolve) => {
		if (localStorage.getItem('token')) {
			agent.Auth.infoUser(localStorage.getItem('token'))
				.then((res) => {
					resolve(res.success);
				});
		} else {
			resolve(false);
		}
	});
};

export const storeF = async () => {
	const userinfo = await saveLocal();
	return createStore(reducer,
		{common: {
			userInfo: userinfo.user,
			token: userinfo.token,
			appName: 'BuyPrime',
			stateSidebar: true,
		}},
		composeWithDevTools(
			applyMiddleware(myRouterMiddleware, promiseMiddleware, thunk),
		)
	);
};

/* func();

export const store = createStore(reducer,
	{common: {userInfo: func()}}, composeWithDevTools(
		applyMiddleware(myRouterMiddleware, promiseMiddleware, thunk),
	)
);
*/
