import React from 'react';

/**
 * @function Input
 * @param {Object} props
 * @return {JSX}
 */
export const Input = (props) => {
	return (
		<section className="form-group col-md-6 mw-100">
			<label className="mb-0" htmlFor={props.name}>
				{props.labelName}
				<label className="ml-1 text-danger">*</label>
			</label>
			<input
				required
				type={props.type}
				className="form-control"
				id={props.name}
				placeholder={props.placeholder}
				value={props.value || ''}
				onChange={props.changeInput(props.storeName)} />
		</section>
	);
};
