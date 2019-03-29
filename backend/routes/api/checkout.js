/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

router.get('/countries', (req, res) => {
	fetch('http://magento23pwa.test/index.php/rest/V1/directory/countries', {
		method: 'GET',
	}).then((res) => res.json())
		.then((countries) => {
			res.status(200).json({countries: countries});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/shippingaddress', (req, res) => {
	fetch('http://magento23pwa.test/index.php/rest/V1/carts/'+
	req.body.idCart+'/estimate-shipping-methods', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body.address),
	}).then((res) => res.json())
		.then((methods) => {
			res.status(200).json({methods: methods});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/shippingmethods', (req, res) => {
	fetch('http://magento23pwa.test/index.php/rest/V1/carts/'+
	req.body.idCart+'/shipping-information', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body.methods),
	}).then((res) => res.json())
		.then((methods) => {
			res.status(200).json({methods: methods});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

module.exports = router;
