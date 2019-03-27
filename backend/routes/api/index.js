/* eslint-disable */
const router = require('express').Router();
/* eslint-enable */

router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.use('/checkout', require('./checkout'));

router.use((err, req, res, next) => {
	if (err.name === 'ValidationError') {
		return res.status(422).json({
			errors: Object.keys(err.errors).reduce((errors, key) => {
				errors[key] = err.errors[key].message;

				return errors;
			}, {}),
		});
	}

	return next(err);
});

module.exports = router;