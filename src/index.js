import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {storeF} from './store';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './components/App';

const loadAll = async () => {
	const store = await storeF();

	ReactDOM.render((
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</BrowserRouter>
		</Provider>

	), document.getElementById('root'));

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: http://bit.ly/CRA-PWA
	serviceWorker.register();
};

loadAll();
