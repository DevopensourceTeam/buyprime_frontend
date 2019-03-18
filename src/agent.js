import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import axios from 'axios';

const superagent = superagentPromise(_superagent, global.Promise);

axios.get('http://magento23pwa.test/rest/V1/products/types').then((response) => {
	// handle success
	console.log('Response:', response);
}).catch((error) => {
	// handle error
	console.log('Error: ', error);
}).then(() => {
	// always executed
});

axios.post('http://magento23pwa.test/rest/V1/customers', {
	data: {'customer': {
		'email': 'dani@devopensource.com',
		'firstname': 'Dani',
		'lastname': 'Ortiz',
	},
	'password': 'Magneto123.',
	},
	config: {headers: {'Content-Type': 'application/json'}},
}).then((response) => {
	// handle success
	console.log('Response:', response);
}).catch((error) => {
	// handle error
	console.log('Error: ', error);
}).then(() => {
	// always executed
});
/**
* API Request
*/
const API_ROOT = 'http://magento23pwa.test/rest';

const responseBody = (res) => res.body;

/**
* Get, Post, Put, Del
*/
const requests = {
	del: (url) =>
		superagent.del(`${API_ROOT}${url}`).then(responseBody),
	get: (url) =>
		superagent.get(`${API_ROOT}${url}`).then(responseBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
};

requests.get('/V1/products/types').then((response) => {
	console.log(response);
});

const Auth = {
	/**
	 * @function getUserChat
	 * @param {String} user
	 * @desc Send user to get channel messages
	 * @return {*}
	 */
	createCustomer: (user) =>
		requests.post(`/V1/customers`,
			JSON.stringify({customer: user.customer, password: user.password})),
};

/**
* @desc Export constants
*/
export default {
	Auth,
};
