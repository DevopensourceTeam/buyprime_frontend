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

module.exports = router;
