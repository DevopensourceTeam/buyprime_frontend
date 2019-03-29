import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

/**
* API Request
*/
const API_ROOT = 'http://localhost:8080/api';

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

const Products = {
	getProduct: (products) =>
		requests.post(`/products/getone`, {products: products}),
};

const Auth = {
	/**
	 * @function createCustomer
	 * @param {Object} user
	 * @desc Send user to create customer
	 * @return {*}
	 */
	createCustomer: (user) =>
		requests.post(`/auth/register`,
			{customer: user.customer, password: user.password}),
	/**
	 * @function loginCustomer
	 * @param {String} user
	 * @param {String} password
	 * @desc Send user to login customer
	 * @return {*}
	 */
	loginCustomer: (user, password) =>
		requests.post(`/auth/login`,
			{username: user, password: password}),
	/**
	 * @function infoUser
	 * @param {String} token
	 * @desc Get user token
	 * @return {*}
	 */
	infoUser: (token) =>
		requests.post(`/auth/infouser`, {token}).then((res) => res),
};

const Cart = {
	idCart: (id) =>
		requests.post(`/cart/idCart`, {id}),
	addItem: (sku, idCart) =>
		requests.post(`/cart/addItem`, {sku, idCart}),
	removeItem: (idItem, idCart) =>
		requests.post(`/cart/removeItem`, {idItem, idCart}),
	updateItem: (item) =>
		requests.post(`/cart/updateItem`, {item}),
};

const Checkout = {
	getCountries: () =>
		requests.get(`/checkout/countries`),
};

/**
* @desc Export constants
*/
export default {
	Auth,
	Products,
	Cart,
	Checkout,
};
