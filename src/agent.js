import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// const reqData1 = '{"customer": {"email": "dani@devopensource.com",'+
// '"firstname": "Dani","lastname": "Ortiz",},"password": "Magneto123.",}';

(async () => {
	const rawResponse = await fetch('https://magento23pwa.test/index.php/rest/V1/customers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"customer": {
				"email": "dani.ort@devopensource.com",
				"firstname": "Dani",
				"lastname": "Ortiz",
			},
			"password": "Magneto123.",
		}),
	});
	const content = await rawResponse.json();

	console.log(content);
})();

/**
* API Request
*/
const API_ROOT = 'https://magento23pwa.test/rest';

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

const Auth = {
	/**
	 * @function getUserChat
	 * @param {String} user
	 * @desc Send user to get channel messages
	 * @return {*}
	 */
	createCustomer: (user) =>
		requests.post(`/V1/customers`,
			{customer: user.customer, password: user.password}),
};

/**
* @desc Export constants
*/
export default {
	Auth,
};
