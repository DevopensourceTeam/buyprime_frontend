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

const Video = {
	/**
	 * @function getUserChat
	 * @param {String} user
	 * @desc Send user to get channel messages
	 * @return {*}
	 */
	getUserChat: (user) =>
		requests.get(`/chats/${JSON.stringify(user)}`),
	/**
	 * @function saveMessage
	 * @param {String} message
	 * @param {String} user
	 * @desc Add new message in the channel
	 * @return {*}
	 */
	saveMessage: (message, user) =>
		requests.post('/chats/', {message: message, user: user}),
};

/**
 * @desc Export constants
 */
export default {
	Video,
};
