import React,{ useEffect, useState} from 'react'
import {Link} from'react-router-dom';
import {GET_CART, GET_ALL, GET_CARTACOUNT } from '../api/apiService';
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
function Header() {
    const [categories,setCategories]=useState([]);
	const native=useNavigate();
	const [amount,setAmount]=useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [productId,setProductId]=useState(0);
	
	
	const handleUser =async()=>{
		try {
			const response = await axios.get('http://localhost:8080/api/user/infor',{
			withCredentials: true // Để gửi cookie (session) nếu cần
		});
		console.log(response)
		if(response.data == "chua dang nhap"){
			native(`/login`)
		}else{
			native(`/ProfileSetting`)
		}
		}catch (err) {
					console.log( "Có lỗi xảy ra khi lấy thông tin người dùng.");
	}
	}
	const login = async () => {
		try {
			   const response = await axios.get('http://localhost:8080/api/user/infor',{
			   withCredentials: true // Để gửi cookie (session) nếu cần
		   });
		   return response.data;
				   }catch (err) {
					   console.log( "Có lỗi xảy ra khi lấy thông tin người dùng.");
	   }}
		
	const handleOrders =async()=>{
		const authStatus =await login()
		if(!authStatus || authStatus === "chua dang nhap"){
			alert("Bạn chưa đăng nhập.");
			native("/login");  
			 return;
		}
			try {
				axios.get('http://localhost:8080/api/orders',{
				withCredentials: true // Để gửi cookie (session) nếu cần
			})
				
				native(`/ProfileOrders`)
				}catch (err) {
						console.log( "loi.");
		}
			}
	const hand=()=>{
		native(`/Search?name=${searchQuery}`);
	};
	const handcategory=(e)=>{
		// native(`/ListingGrid?categoryId=${categoryId}`);
			if(e.target.value==="allproduct"){
				native(`/ListingGrid`);
			}
			else{
				native(`/ListingGrid?categoryId=${e.target.value}`);
			}
	};
	useEffect(()=>{
		try {
			GET_ALL(`categories`).then((props)=>setCategories(props.data));
			
		} catch (error) {
			console.log("thua")
		}
	},[]);
useEffect(()=>{
	try {
		GET_CARTACOUNT(`orderdetail/acount`).then((response)=>{
			if (response?.data) {
				setAmount(response.data);
			} else {
				console.log("No data found:", response?.data);
			}
		})
	} catch (error) {
		console.error("Failed to fetch cart amount:", error);
	}
},[])
return (
<header class="section-header">
<section class="header-main border-bottom">
<div class="container">
		<div class="row align-items-center">
			<div class="col-xl-2 col-lg-3 col-md-12">
				<Link to="/" class="brand-wrap">
                    <img class="logo" src={require('../assets/images/logo.png')} />
				</Link>
			</div>
			<div class="col-xl-6 col-lg-5 col-md-6">
				<form  class="search-header">	
					<div class="input-group w-100">                 
					    <input name="name" type="text" class="form-control" placeholder="Search" value={searchQuery} 
                         onChange={(e) =>hand( setSearchQuery(e.target.value))} />
					      <button class="btn btn-primary" type="submit" >
					        <i class="fa fa-search"></i> 
					      </button>
				    </div>
				</form> 
			</div>
			<div class="col-xl-4 col-lg-4 col-md-6">
				<div class="widgets-wrap float-md-right">
					<div class="widget-header mr-4">
						<a href="#" class="widget-view" onClick={(e)=>{handleUser()}}>
							<div class="icon-area">
								<i class="fa fa-user"></i>
							</div>
							<small class="text"> My profile </small>
						</a>
					</div>
					<div class="widget-header mr-4">
						<a href="http://localhost:3000/Cart" class="widget-view">
							<div class="icon-area">
								<i class="fa fa-shopping-cart"></i>
								<span class="notify">{amount}</span>
							</div>
							<small class="text"> Cart </small>
						</a>
					</div>
					<div class="widget-header mr-4">
						<a href="#" class="widget-view" onClick={()=>{handleOrders()}}>
							<div class="icon-area">
								<i class="fa fa-store"></i>
							</div>
							<small class="text"> Orders </small>
						</a>
					</div>
				</div> 
			</div> 
		</div> 
		<nav class="navbar navbar-main navbar-expand pl-0">
							<ul class="navbar-nav flex-wrap">
							<li class="nav-item">
							<Link class="nav-link" to="/">
							Trang chủ
							</Link>
							</li>
							<li class="nav-item">
							<select class="custom-select border-right" name="category_name" onChange={handcategory}>
								<option value="allproduct">All Product</option>
                                        {categories.map((row) => (
                                            <option  key={row.id} value={row.id}>
												{row.name}
                                            </option>
                                        ))}
                                    </select>
									</li>
							</ul>
							</nav>	
	</div> 
</section> 
</header>
        );
    }

export default Header
