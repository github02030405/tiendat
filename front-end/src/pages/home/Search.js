import React, {useState, useEffect } from 'react'
import { GET_SEARCH ,POST_ID} from '../../api/apiService';
import { useLocation,Link } from 'react-router-dom';
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
const cardTextStyle = {
	maxWidth: "80%",
};
const  Search=(props)=>{
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const currentPage = queryParams.get("name");
     const[product,setProduct]=useState([]);
	 const[productId,setProductId]=  useState('');
	 const	getDate=(e)=> {
		const today = new Date(e);
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		const date = today.getDate();
		return `${date}/${month}/${year}`;
	  }
	  const handle=(row,e)=>{
		e.preventDefault();
		setProductId(row.id)
	}
     useEffect(()=>{
        GET_SEARCH(`product/search`,currentPage).then((props)=>{setProduct(props.data);
			console.log(props.data);
		POST_ID(`orderdetail`,productId);
		});
     },[currentPage,productId]);
    return (
        <div class="row">
				{product.length > 0 &&
					product.map((row) => (
						<div class="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
							<div class="card card-product-grid">
							<a href={`/product-detail?productId=${row.id}`} class="img-wrap">
									<img src={`/images/products/${row.thumbnail}`} alt=""/>
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
									<a href="#" class="btn btn-primary" style={{marginTop:"5px"}} onClick={((e) => handle(row,e))}>
									<i class="fas fa-shopping-cart"></i>{" "}
									<span class="text">Add to cart</span>
									</a>
								</figcaption>
							</div>
						</div>
					))}
				</div>
    );
}
export default Search;