/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

router.get('/getone', async (req, res) => {
	fetch('http://magento23pwa.test/rest/V1/products/VA15-SI-NA', {
		method: 'GET',
	}).then((res) => res.json())
		.then((response) => {
			const product = response;
			fetch('http://magento23pwa.test/rest/V1/products/VT07-KH-XS', {
				method: 'GET',
			}).then((res) => res.json())
				.then((response) => {
					res.status(200).json({product: [product, response]});
				}).catch((error) => {
					res.status(400).json({error: error});
				});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

module.exports = router;
