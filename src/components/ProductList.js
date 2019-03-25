import React from 'react';

/**
 * @function Product
 * @param {Object} props
 * @return {JSX}
 */
const ProductList = (props) => {
	return (
		props.products ?
			props.products.map((product, i) => {
				return <section
					className="d-flex"
					key={i}>
					<img className="ml-3 mr-3 h-100" width="150px"
						src={'http://magento23pwa.test/media/catalog/product/'+
						product.media_gallery_entries[0].file} />
					<section className="m-3">
						<h3 className="mt-2">{product.name}</h3>
						<h4>$ {product.price}</h4>
						<button
							className="btn btn-primary m-2"
							type="button"
							onClick={() =>
								props.addCart({id: product.id, sku: product.sku, qty: 1})}>
							Add to Cart
						</button>
					</section>
				</section>;
			})
			: <label className="w-100 mt-5 mb-5 d-flex
				justify-content-center lds-dual-ring"></label>
	);
};

export default ProductList;
