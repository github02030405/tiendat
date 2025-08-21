import axios from "axios";
import React,{Component, useEffect, useState} from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom";
import { DELETE_CARTID, DELETE_ID, PUT_CART } from "../../api/apiService";
const Address=()=>{
	const navigate = useNavigate();
    const[address,setAddress]=useState([]);
   const updateStatus = async (row) => {  
    try {
      await PUT_CART(`address/status`, row.id).then((props)=>{
        console.log(props.data)
      });
      // Reload cart after updating item
      loadOrders();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  let t=0
  const update=(e)=>{
    navigate(``)
  }
  const deletId= (row)=>{
    DELETE_ID(`address/${row.id}`)
    console.log("đã xóa thành công");
    loadOrders();
  }
  const loadOrders= async()=>{
    try {
       await axios.get('http://localhost:8080/api/address/user',{
        withCredentials: true // Để gửi cookie (session) nếu cần
    }).then((props)=>{
        setAddress(props.data)
        console.log(props.data)
    })
        }catch (err) {
                console.log( "loi.");
    }
    }
    useEffect(()=>{
		loadOrders()
	},[])
    return(
<section class="section-content padding-y">
	<div class="container">
	<div class="row">
		<aside class="col-md-3">
        <nav class="list-group">
					<a class="list-group-item active" href="ProfileAddress"> My Address </a>
					<a class="list-group-item " href="ProfileOrders"> My Orders </a>
					<a class="list-group-item" href="ProfileSetting"> Settings </a>
					<a class="list-group-item" href="page-index-1.html"> Log out </a>
				</nav>
		</aside> 
		<main class="col-md-9">
		<a href="#" class="btn btn-light mb-3" onClick={()=> navigate("/fromAddress")}> <i class="fa fa-plus"></i> Add new address </a>
        <div class="row">
        {address.length>0 && address.map((row)=>(
            <div class="col-md-6">
            <article class="box mb-4">
                <h6>{t=t+1}</h6>
                <p>Tên:{row.fullname}</p>
                <p>địa chỉ:{row.address}</p>
                <p>số điện thoai:{row.phone_number}</p>
                {row.status === 1 ?(
                    <span >
                       <a href="#" class="btn btn-light disabled"> <i class="fa fa-check"></i> Default</a> 
                    </span>
                ):(
                    <span>
                    <a href="#" class="btn btn-light" onClick={()=>{updateStatus(row)}}>Make default</a> 
                    </span>
                )}
                 <a href="#" class="btn btn-light"onClick={()=>navigate(`/UpdateAddress?ID=${row.id}&`)}> <i class="fa fa-pen"></i> </a>  
                 <a href="#" class="btn btn-light" onClick={()=>{deletId(row)}}> <i class="text-danger fa fa-trash"></i>  </a>
             
            </article>
        </div>  
        ))}
        </div> 
	</main> 
</div>
</div> 
</section>
    )
}
export default Address;