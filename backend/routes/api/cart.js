/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

getImgItem = (item) => {
	return new Promise((resolve) => {
		fetch(URL_BACKEND+'/V1/products/'+item.sku+'/media', {
			method: 'GET',
		}).then((res) => res.json())
			.then((image) => {
				resolve({item, image});
			});
	});
};

router.post('/idCart', (req, res) => {
	fetch(URL_BACKEND+'/V1/customers/'+req.body.id+'/carts', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
		},
	}).then((res) => res.json())
		.then((idCart) => {
			fetch(URL_BACKEND+'/V1/carts/'+idCart+'/items', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
				},
			}).then((res) => res.json())
				.then((items) => {
					const asyncI = items.map((item) => {
						return getImgItem(item);
					});
					Promise.all(asyncI).then((items) => {
						res.status(200).json({idCart, items});
					});
				});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/addItem', (req, res) => {
	fetch(URL_BACKEND+'/V1/carts/'+req.body.idCart+'/items', {
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
		.then(async (product) => {
			const allItem = await getImgItem(product);
			allItem.item.image = allItem.image[0];
			res.status(200).json({product: allItem.item});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/removeItem', (req, res) => {
	fetch(URL_BACKEND+'/V1/carts/'+req.body.idCart+'/items/'+req.body.idItem, {
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
		},
	}).then((res) => res.json())
		.then(async (state) => {
			res.status(200).json({state: state});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

router.post('/updateItem', (req, res) => {
	fetch(URL_BACKEND+'/V1/carts/'+req.body.item.quote_id+
	'/items/'+req.body.item.item_id, {
		method: 'PUT',
		headers: {
			'Authorization': 'Bearer 6cpd9641f7o6nzcmbey6m1uizzd8v4jl',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'cartItem': {
				'sku': req.body.item.sku,
				'qty': req.body.item.qty,
				'quote_id': req.body.item.quote_id,
			},
		}),
	}).then((res) => res.json())
		.then(async (item) => {
			const allItem = await getImgItem(item);
			allItem.item.image = allItem.image[0];
			res.status(200).json({item: allItem.item});
		})
		.catch((error) => {
			res.status(400).json({error: error});
		});
});

module.exports = router;
