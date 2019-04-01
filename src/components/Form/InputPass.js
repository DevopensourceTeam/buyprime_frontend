import React from 'react';

/**
 * @function InputPass
 * @param {Object} props
 * @return {JSX}
 */
export const InputPass = (props) => {
	return (
		<section className="form-group col-md-6 mw-100">
			<label className="mb-0" htmlFor={props.name}>
				{props.labelName}
				<label className="ml-1 text-danger">*</label>
			</label>
			<section className="d-flex align-items-center">
				<input
					required
					type={props.passType}
					className="form-control"
					id={props.name}
					placeholder={props.placeholder}
					value={props.value || ''}
					onChange={props.changeInput(props.storeName)} />
				{
					props.passType === 'password' ?
						<i className="far fa-eye ml-3 mb-0 c-pointer h5"
							onClick={() =>
								props.changePassType(props.passName, 'text')}></i>
						:
						<i className="far fa-eye-slash ml-3
						text-muted mb-0 c-pointer h5"
						onClick={() =>
							props.changePassType(props.passName, 'password')}>
						</i>
				}
			</section>
		</section>
	);
};
