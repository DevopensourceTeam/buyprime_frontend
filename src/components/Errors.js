import React from 'react';

/**
 * @function Errors
 * @param {Object} props
 * @return {JSX}
 */
const Errors = (props) => {
	return (
		<section>
			{
				props.errors ? props.errors.map((error, i) => {
					return <p key={i} className="m-3 text-danger small">
						<i className="fas fa-exclamation-circle mr-2"></i>
						{error.key}: {error.error}</p>;
				}) : ''
			}
		</section>
	);
};

export default Errors;
