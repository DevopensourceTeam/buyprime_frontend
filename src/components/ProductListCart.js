import React from 'react';

/**
 * @function Product
 * @param {Object} props
 * @return {JSX}
 */
const ProductListCart = (props) => {
	return (
		props.products.length > 0 ?
			<section className="w-100">
				{props.products.map((product, i) => {
					return <section
						className="d-flex
							justify-content-around
							small rounded p-3 mr-4
							border border-secondary mb-3"
						key={i}>
						<img className="h-100" width="100px"
							src={'http://magento23pwa.test/media/catalog/product'+
							product.image.file}
							alt="thumblain product"/>
						<p className="m-0"><strong>{product.name}</strong></p>
						<p className="m-0">{product.price}$</p>
						<p className="m-0">
							{
								product.qty < 2 ?
									<label className="pr-2 pl-2 pt-1 pb-1
										m-2 bg-light rounded c-pointer">
										<strong>-</strong></label>
									:
									<label className="pr-2 pl-2 pt-1 pb-1
										m-2 bg-light rounded c-pointer"
									onClick={() => props.changeQty(product.id, '-')}>
										<strong>-</strong></label>
							}
							{product.qty}
							<label className="pr-2 pl-2 pt-1 pb-1
								m-2 bg-light rounded c-pointer"
							onClick={() => props.changeQty(product.id, '+')}>
								<strong>+</strong></label>
						</p>
						<p className="m-0">{product.qty * product.price}$</p>
						<i className="far fa-times-circle text-secondary
							h5 m-0 c-pointer fit-content"
						onClick={() => props.removeItem(product.id)}></i>
					</section>;
				})}
			</section>
			: <label className="w-100 mt-5 mb-5 d-flex">Add products to Cart</label>
	);
};

export default ProductListCart;
