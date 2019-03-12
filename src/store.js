import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {promiseMiddleware} from './middleware';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(reducer, composeWithDevTools(
	applyMiddleware(myRouterMiddleware, promiseMiddleware, thunk),
));
