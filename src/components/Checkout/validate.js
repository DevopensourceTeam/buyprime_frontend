/**
 * @constant validate
 */
export const validate = {
	/**
	 * @function validateForm
	 * @desc Async function to validate the Login form
     * @param {String} email
     * @param {String} fname
     * @param {String} lname
     * @param {String} company
     * @param {String} address
     * @param {String} city
     * @param {String} postalcode
     * @param {Integer} phone
	 * @return {Promise}
	 */
	/* eslint-disable */
	validateFormCheck: async (email, fname, lname, company, street, city, country, province, postalcode, phone, provinces) => {
		return new Promise((resolve) => {
			const errors = [];
			const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const postalcodeRE = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
			const phoneRE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
			/* eslint-enable */

			if (!email) {
				errors.push({key: 'Email', error: 'Email is required'});
			} else if (!emailRE.test(email)) {
				errors.push({key: 'Email', error: 'Email is invalid'});
			}

			if (!fname.replace(/ /g, '')) {
				errors.push({key: 'First Name', error: 'First Name is required'});
			} else if (fname.includes(' ')) {
				errors.push({
					key: 'First Name',
					error: 'First Name can\'t contains spaces',
				});
			} else if (fname.length < 3 || fname.length > 15) {
				errors.push({
					key: 'First Name',
					error: 'First Name must be between 3 & 15 letters',
				});
			}

			if (!lname) {
				errors.push({key: 'First Name', error: 'First Name is required'});
			} else if (lname.includes(' ')) {
				errors.push({
					key: 'Last Name',
					error: 'Last Name can\'t contains spaces',
				});
			} else if (lname.length < 3 || lname.length > 15) {
				errors.push({
					key: 'Last Name',
					error: 'Last Name must be between 3 & 15 letters',
				});
			}

			if (company) {
				if (company.length < 3 || company.length > 15) {
					errors.push({
						key: 'Company',
						error: 'Company must be between 3 & 15 letters',
					});
				}
			}

			if (!street) {
				errors.push({key: 'Street', error: 'Street is required'});
			} else if (street.includes(' ')) {
				errors.push({
					key: 'Street',
					error: 'Street can\'t contains spaces',
				});
			} else if (street.length < 3 || street.length > 15) {
				errors.push({
					key: 'Street',
					error: 'Street must be between 3 & 15 letters',
				});
			}

			if (!city) {
				errors.push({key: 'City', error: 'City is required'});
			} else if (city.includes(' ')) {
				errors.push({
					key: 'City',
					error: 'City can\'t contains spaces',
				});
			} else if (city.length < 3 || city.length > 15) {
				errors.push({
					key: 'City',
					error: 'City must be between 3 & 15 letters',
				});
			}

			if (!country) {
				errors.push({
					key: 'Country',
					error: 'Select a Country',
				});
			} if (provinces.length < 1 && country) {
				errors.push({
					key: 'Country',
					error: 'Invalid Country',
				});
			}

			if (!province && provinces.length > 0) {
				errors.push({
					key: 'Province',
					error: 'Select a Province',
				});
			}

			if (!postalcode) {
				errors.push({
					key: 'Zip/Postal Code',
					error: 'Zip/Postal Code is required',
				});
			} else if (!postalcodeRE.test(postalcode)) {
				errors.push({
					key: 'Zip/Postal Code',
					error: 'Zip/Postal Code is invalid',
				});
			}

			if (!phone) {
				errors.push({key: 'Phone', error: 'Phone is required'});
			} else if (!phoneRE.test(phone)) {
				errors.push({
					key: 'Phone',
					error: 'Phone is invalid',
				});
			}

			resolve(errors);
		});
	},
};
