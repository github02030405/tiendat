// 
import React, { useEffect, useState } from "react";
import { GET_ALL, POST_ID } from "../../api/apiService";
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const cardTextStyle = {
	maxWidth: "80%",
};
const Items = () => {
	const [products, setProducts] = useState([]);
	const[productId,setProductId]=  useState('');
	const handle=(row,e)=>{
		e.preventDefault();
		setProductId(row.id);
	
		// 	if (typeof productSelect === "function") {
    // 		  productSelect(row.id); // hoặc row, tùy mục đích
	//  		 console.error("productSelect is  a function" ,typeof productSelect);
    // } else {
    //   console.error("productSelect is not a function", productSelect);
    // }
	// if (onAddToCart && typeof onAddToCart === 'function') {
	// 		onAddToCart(); // 👈 tăng số lượng giỏ hàng
	// 	}
	 }
	const	getDate=(e)=> {
		const today = new Date(e);
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		const date = today.getDate();
		return `${date}/${month}/${year}`;
	  }
	useEffect(() => {
		GET_ALL(`product/new`)
		.then((item) => {
		  if (Array.isArray(item.data)) {
			setProducts(item.data);
		  } else {
			console.error("API did not return an array:", item.data);
			setProducts([]); // Default to an empty array if response is unexpected
		  }
		})
		.catch((error) => console.error("Error fetching products:", error));
		POST_ID(`orderdetail`,productId);
	}, [productId]);
	return (
		
		<section class="padding-bottom">
			<header class="section-heading mb-4">
				<h3 class="title-section">Product New</h3>
			</header>
			<div class="row">
			
				{products.length > 0 &&
					products.map((row) => (
						<div class="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
							<div class="card card-product-grid">
							<a href={`/product-detail?productId=${row.id}`} class="img-wrap">
									<img  src={`/images/products/${row.thumbnail}`} alt=""/>
								</a>
								<figcaption class="info-wrap">
									<ul class="rating-stars mb-1">
										<li style={{ cardTextStyle }} class="stars-active">
											<img src={startsActive} alt="" />
										</li>
										<li>
											<img src={startsDisable} alt="" />
										</li>
									</ul>
									<div>
										<Link to={`/product-detail?productId=${row.id}`}  class="title">
											<div>{row.title}</div>
											<div>time:{getDate(row.created_at)}</div>
										</Link>
									</div>
									<div class="price h5 mt-2">Giá:{row.price} VND</div>

									<div class="text-wrap p-6">
                               	 <span class="badge badge-danger">Sale:{row.discount}% </span>
                          		  </div>
									<a href="#" class="btn btn-primary" style={{marginTop:"5px"}} onClick={(e) =>{ handle(row,e);	
										
									}}>
									<i class="fas fa-shopping-cart"></i>{" "}
									<span class="text">Add to cart</span>
									</a>
								</figcaption>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};
export default Items;

// () => setProductId(row.id)