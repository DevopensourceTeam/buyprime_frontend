/* eslint-disable */
const router = require('express').Router();
const fetch = require('node-fetch');
/* eslint-enable */

getProduct = (sku) => {
	return new Promise((resolve) => {
		fetch(URL_BACKEND+'/V1/products/'+sku, {
			method: 'GET',
		}).then((res) => res.json())
			.then((product) => {
				resolve(product);
			})
			.catch((error) => {
				res.status(400).json({error: error});
			});
	});
};

router.post('/getone', async (req, res) => {
	const asyncP = req.body.products.map((sku) => {
		return getProduct(sku);
	});
	Promise.all(asyncP).then((resp) => {
		res.status(200).json({product: resp});
	});
});

module.exports = router;
