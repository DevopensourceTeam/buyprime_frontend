import React from 'react';

/**
 * @function Product
 * @param {Object} props
 * @return {JSX}
 */
const ProductListCart = (props) => {
	return (
		props.products.length > 0 ?
			<section className="w-100 m-4">
				{props.products.map((product, i) => {
					return <section
						className="d-flex
							justify-content-around
							rounded p-2 mb-2
							border border-secondary"
						key={i}>
						<img className="h-100" width="65px"
							src={'http://magento23pwa.test/media/catalog/product'+
							product.image.file}
							alt="thumblain product"/>
						<section className="d-flex pt-2 pb-2">
							<section className="d-flex flex-column ml-3 mr-3">
								<p className="m-0 h-6"><strong>{product.name}</strong></p>
								<p className="m-0 h-6">qty: {product.qty}</p>
							</section>
							<p className="m-0 h-6">{product.qty * product.price} $</p>
						</section>
					</section>;
				})}
			</section>
			: ''
	);
};

export default ProductListCart;
