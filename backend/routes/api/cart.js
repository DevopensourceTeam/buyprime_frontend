/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

router.post('/idCart', (req, res) => {
	fetch('http://magento23pwa.test/index.php/rest/V1/customers/'+req.body.id+'/carts', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
		},
	}).then((res) => res.json())
		.then((idCart) => {
			fetch('http://magento23pwa.test/index.php/rest/V1/carts/'+idCart+'/items', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
				},
			}).then((res) => res.json())
				.then((items) => {
					res.status(200).json({idCart, items});
				});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/addItem', (req, res) => {
	fetch('http://magento23pwa.test/index.php/rest/V1/carts/'+req.body.idCart+'/items', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'cartItem': {
				'sku': req.body.sku,
				'qty': 1,
				'quote_id': req.body.idCart,
			},
		}),
	}).then((res) => res.json())
		.then((product) => {
			res.status(200).json({product: product});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

module.exports = router;
