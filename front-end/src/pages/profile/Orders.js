import axios from "axios";
import React,{Component, useEffect, useState} from 'react'

const Orders=()=>{
const	getDate=(e)=> {
		const today = new Date(e);
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		const date = today.getDate();
		return `${date}/${month}/${year}`;
	  }
	const [orders,setOrders]=useState([]);
	
	useEffect(()=>{
		try {
			axios.get('http://localhost:8080/api/orders/all',{
			withCredentials: true // Để gửi cookie (session) nếu cần
		}).then((res)=>{
			 if (!res.data || res.data.length === 0) {
					console.log("Không có dữ liệu đơn hàng");
					alert("Không có dữ liệu đơn hàng!");
				} else {
					setOrders(res.data);
					console.log(res.data);
      }
		})
			}catch (err) {
					console.log( "loi.");
	}
	},[])
			
    return(
	<section class="section-content padding-y">
		<div class="container">
		
		<div class="row">
			<aside class="col-md-3">
				<nav class="list-group">
					<a class="list-group-item" href="ProfileAddress"> My Address </a>
					<a class="list-group-item active" href="ProfileOrders"> My Orders </a>
					<a class="list-group-item" href="ProfileSetting"> Settings </a>
					<a class="list-group-item" href="page-index-1.html"> Log out </a>
				</nav>
			</aside> 
			<main class="col-md-9">
			{orders.length >0 && orders.map((row)=>( 
				<article class="card mb-4"key={row.id}>
				<header class="card-header">
					<a href="#" class="float-right"> <i class="fa fa-print"></i> Print</a>
					<strong class="d-inline-block mr-3">Order ID: {row.id}</strong>
					<span>Order Date: {getDate(row.order_date)}</span>
				</header>
				<div class="card-body">
					<div class="row"> 
						<div class="col-md-8">
							<h6 class="text-muted">Delivery to</h6>
							<p>{row.inforUser.fullname}</p>  
							<p>Phone +84:<span></span>{row.inforUser.phone_number} </p>  
							<p>Location: {row.inforUser.address} </p>  
						</div>
						<div class="col-md-4">
							<h6 class="text-muted">Payment</h6>
							<span class="text-success">
								<i class="fab fa-lg fa-cc-visa"></i>
								Visa  **** 4216  
							</span>
							<br/>
		
							 <span class="b">Total: ${row.total_money} </span>
						</div>
					</div> 
				</div>
				{Array.isArray(row.orderDetails) && row.orderDetails.length>0 ? (
				<div class="table-responsive">
				<table class="table table-hover">
					<tbody>
					{ row.orderDetails.map((detail) => (
						<tr  key={detail.product.id}>
						<td width="65">
						<img src={`/images/products/${detail.product.thumbnail}`} alt={detail.product.title} style={{height:"80px"}}/>
						</td>
						<td> 
							<p class="title mb-0">{detail.product.title}</p>
							<var class="price text-muted">USD {detail.product.price}</var>
						</td>
						<td> Seller <br/> Nike clothing </td>
						<td width="250"> <a href="#" class="btn btn-outline-primary">Track order</a> 
							<div class="dropdown d-inline-block">
								 <a href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-outline-secondary">More</a>
								 <div class="dropdown-menu dropdown-menu-right">
									 <a href="#" class="dropdown-item">Return</a>
									 <a href="#"  class="dropdown-item">Cancel order</a>
								 </div>
							</div> 
						</td>
					</tr>
					))}
				</tbody></table>
				</div> 
				 ) : (
					<p>No order details available.</p>  // Fallback in case orderDetails is undefined or not an array
				  )}
				</article> 
		))}
	
		
			</main> 
		
		</div>
		</div> 
		</section> 


// <section className="section-content padding-y">
//       <div className="container">
//         <div className="row">
//           <aside className="col-md-3">
//             <nav className="list-group">
//               <a className="list-group-item" href="page-profile-main.html"> Account overview </a>
//               <a className="list-group-item" href="page-profile-address.html"> My Address </a>
//               <a className="list-group-item active" href="page-profile-orders.html"> My Orders </a>
//               <a className="list-group-item" href="page-profile-wishlist.html"> My wishlist </a>
//               <a className="list-group-item" href="page-profile-seller.html"> My Selling Items </a>
//               <a className="list-group-item" href="page-profile-setting.html"> Settings </a>
//               <a className="list-group-item" href="page-index-1.html"> Log out </a>
//             </nav>
//           </aside>

//           <main className="col-md-9">
//             {orders.length > 0 && orders.map((row) => (
//               <article className="card mb-4" key={row.id}>
//                 <header className="card-header">
//                   <a href="#" className="float-right"> <i className="fa fa-print"></i> Print</a>
//                   <strong className="d-inline-block mr-3">Order ID: {row.id}</strong>
//                   <span>Order Date: {new Date(row.order_date).toLocaleDateString()}</span>
//                 </header>
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-8">
//                       <h6 className="text-muted">Delivery to</h6>
//                       <p>{row.fullname || "Name not provided"}</p>
//                       <p>Phone +84: <span></span>{row.phone_number || "Phone number not provided"}</p>
//                       <p>Location: {row.address || "Address not provided"}</p>
//                     </div>
//                     <div className="col-md-4">
//                       <h6 className="text-muted">Payment</h6>
//                       <span className="text-success">
//                         <i className="fab fa-lg fa-cc-visa"></i>
//                         Visa **** 4216
//                       </span>
//                       <br />
//                       <span className="b">Total: ${row.total_money}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {Array.isArray(row.orderDetails) && row.orderDetails.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table table-hover">
//                       <tbody>
//                         {row.orderDetails.map((detail) => (
//                           <tr key={detail.product.id}>
//                             <td width="65">
//                               <img src={`images/items/${detail.product.thumbnail || "default.jpg"}`} className="img-xs border" alt="Product" />
//                             </td>
//                             <td>
//                               <p className="title mb-0">{detail.product.title || "Product title not available"}</p>
//                               <var className="price text-muted">USD {detail.product.price}</var>
//                             </td>
//                             <td>Seller <br /> Nike clothing</td>
//                             <td width="250">
//                               <a href="#" className="btn btn-outline-primary">Track order</a>
//                               <div className="dropdown d-inline-block">
//                                 <a href="#" data-toggle="dropdown" className="dropdown-toggle btn btn-outline-secondary">More</a>
//                                 <div className="dropdown-menu dropdown-menu-right">
//                                   <a href="#" className="dropdown-item">Return</a>
//                                   <a href="#" className="dropdown-item">Cancel order</a>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p>No order details available.</p>
//                 )}
//               </article>
//             ))}
//           </main>
//         </div>
//       </div>
//     </section>
    )

}
export default Orders;