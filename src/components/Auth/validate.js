/**
 * @constant validate
 */
export const validate = {
	/**
	 * @function validateForm
	 * @desc Async function to validate the Login form
	 * @param {String} email
	 * @param {String} password
	 * @return {Promise}
	 */
	validateFormLog: async (email, password) => {
		return new Promise((resolve) => {
			const errors = [];
			/* eslint-disable */
			const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const passRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/;
			/* eslint-enable */

			if (!email) {
				errors.push({key: 'Email', error: 'Email is required'});
			} else if (!emailRE.test(email)) {
				errors.push({key: 'Email', error: 'Email is invalid'});
			}

			if (!password) {
				errors.push({key: 'Password', error: 'Password is required'});
			} else if (!passRE.test(password)) {
				errors.push({
					key: 'Password',
					error: 'Password minum length is 8, 1 Lowercase, 1 Uppercase,' +
					'1 Numeric Character, 1 Especial Character',
				});
			}

			resolve(errors);
		});
	},
	/**
	 * @function validateForm
	 * @desc Async function to validate the Register form
	 * @param {String} fname
	 * @param {String} lname
	 * @param {String} email
	 * @param {String} password
	 * @param {String} cpassword
	 * @return {Promise}
	 */
	validateFormReg: async (fname, lname, email, password, cpassword) => {
		return new Promise((resolve) => {
			const errors = [];
			/* eslint-disable */
			const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const passRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/;
			/* eslint-enable */

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

			if (!email) {
				errors.push({key: 'Email', error: 'Email is required'});
			} else if (!emailRE.test(email)) {
				errors.push({key: 'Email', error: 'Email is invalid'});
			}

			if (!password) {
				errors.push({key: 'Password', error: 'Password is required'});
			} else if (!passRE.test(password)) {
				errors.push({
					key: 'Password',
					error: 'Password minum length is 8, 1 Lowercase, 1 Uppercase,' +
					'1 Numeric Character, 1 Especial Character',
				});
			} else if (password !== cpassword) {
				errors.push({
					key: 'Password',
					error: 'Password d\'ont match',
				});
			}

			resolve(errors);
		});
	},
};
