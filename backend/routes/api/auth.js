/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

tokenUser = async (userData) => {
	return new Promise((resolve) => {
		fetch('http://magento23pwa.test/index.php/rest/V1/integration/customer/token', {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json())
			.then((response) => {
				resolve(response);
			});
	});
};

infoUser = async (token) => {
	return new Promise((resolve) => {
		fetch('http://magento23pwa.test/index.php/rest/V1/customers/me', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer '+ token,
			},
		}).then((res) => res.json())
			.then((response) => {
				if (response.message) {
					resolve({error: response.message});
				} else {
					resolve({success: {user: response, token: token}});
				}
			});
	});
};

router.post('/register', (req, res) => {
	try {
		fetch('http://magento23pwa.test/index.php/rest/V1/customers', {
			method: 'POST',
			body: JSON.stringify(req.body),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json())
			.then(async (response) => {
				if (response.message) {
					res.status(200).json({error: response.message});
				} else {
					const user = response;
					const token = await tokenUser({
						'username': req.body.customer.email,
						'password': req.body.password,
					});
					res.status(200).json({success: {user: user, token: token}});
				}
			}).catch((error) => res.status(400).json({error: error}));
	} catch (error) {
		res.status(400).json({error: error});
	}
});

router.post('/login', async (req, res) => {
	const token = await tokenUser(req.body);
	if (token.message) {
		res.status(200).json({error: token.message});
	} else {
		res.status(200).json(await infoUser(token));
	}
});

router.post('/infouser', async (req, res) => {
	res.status(200).json(await infoUser(req.body.token));
});

module.exports = router;
