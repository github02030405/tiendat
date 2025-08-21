// import React, {useEffect, useState } from 'react';
// import {Link} from'react-router-dom';
// import { DELETE_CARTID, DELETE_ID, PUT_CART } from "../../api/apiService";

// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// const AddAddress = () => {
//   const native=useNavigate();
//    const [infor, setInfor] = useState({
//     fullname:'',
//     phone_number:'',
//     address: ''
//   });
//     const[address,setAddress]=useState([]);
//      const updateStatus = async (row) => {  
//     try {
//       await PUT_CART(`address/status`, row.id).then((props)=>{
//         console.log(props.data)
//       });
//       // Reload cart after updating item
//       loadOrders();
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };
//   let t=0
//   const update=(e)=>{
//     native(``)
//   }
//   const deletId= (row)=>{
//     DELETE_ID(`address/${row.id}`)
//     console.log("đã xóa thành công");
//     loadOrders();
//   }
//   const loadOrders= async()=>{
//     try {
//        await axios.get('http://localhost:8080/api/address/user',{
//         withCredentials: true // Để gửi cookie (session) nếu cần
//     }).then((props)=>{
//         setAddress(props.data)
//         console.log(props.data)
//     })
//         }catch (err) {
//                 console.log( "loi.");
//     }
//     }
//     useEffect(()=>{
// 		loadOrders()
// 	},[])
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInfor({
//       ...infor, 
//       [name]: value
//     });
//   };
//  const login = async () => {
//  try {
//         const response = await axios.get('http://localhost:8080/api/user/infor',{
//         withCredentials: true // Để gửi cookie (session) nếu cần
//     });
//     return response.data;
//             }catch (err) {
//                 console.log( "Có lỗi xảy ra khi lấy thông tin người dùng.");
// }}
// const orderdetail= async ()=>{
//     try {
//         const response = await axios.get('http://localhost:8080/api/orderdetail/all',{
//             withCredentials: true // Để gửi cookie (session) nếu cần
//         });
//         console.log(response.data)
//         return response.data;
//     }
//     catch (error) {
//         console.error("not data 2", error);
//       }
// }
// const Address= async ()=>{
//     try {
//         const response = await axios.get('http://localhost:8080/api/address/user',{
//             withCredentials: true // Để gửi cookie (session) nếu cần
//         }
       
//         );
        
//         console.log(response.data)
//         return response.data;
//     }
//     catch (error) {
//         console.error("not data 2", error);
//       }
// }

// const handleLogin = async  (e) => {
//             try {
//                    e.preventDefault();
             
             
//             const authStatus =await login()
//              const userAddress =await address;
//                 const cart= await orderdetail()
//             if(!authStatus || authStatus === "chua dang nhap"){
//                 alert("Bạn chưa đăng nhập.");
//                 native("/login");  
//                  return;
//             }
//             else if(cart.length ===0||!cart){
                
//                 alert("Hãy thêm sản phẩm vào giỏ hàng");
//                 console.log(cart.length)
//                 native("/");  
//                  return;
//             }
//            else if(infor.fullname.length>=3 && infor.phone_number.length>=9 && infor.address.length>3){
//                 await axios.post(`http://localhost:8080/api/address`,infor,{
//                     withCredentials: true // Để gửi cookie (session) nếu cần
//                 })
//             }
//             else if(!userAddress || userAddress.length ===0){
//                   return alert("chưa có thông tin nhận hàng");
//             }
//             else{
                
//                 return alert("Hãy điền đầy đủ thông tin nhận hàng ");
//             }
            
//             await  axios.post(`http://localhost:8080/api/orders`,{
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             },{
//                     withCredentials: true // Để gửi cookie (session) nếu cần
//                 })
//                 alert("Đã đặt hàng thành công.");
//                 native("/"); 
            
//         }
//         catch (error) {
//             console.error('Error creating infor:', error);
//             alert("Đã xảy ra lỗi trong quá trình đặt hàng.");
//         }
//     }

//     const handle = async  (e) => {
//         try {
//             e.preventDefault();
//         const authStatus =await login()
//         if(!authStatus.data || authStatus === "chua dang nhap"){
//             alert("Bạn chưa đăng nhập.");
//             native("/login");  
//              return;
//         }
//         const cart= await orderdetail()
//         if(cart.length ===0||!cart){
//             alert("Hãy thêm sản phẩm vào giỏ hàng");
//             console.log(cart.length)
//             native("/");  
//              return;
//         }
//         await  axios.post(`http://localhost:8080/api/orders`,{
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         },{
//                 withCredentials: true // Để gửi cookie (session) nếu cần
//             })
//             alert("Đã đặt hàng thành công.");
//             native("/"); 
        
//     }
//     catch (error) {
//         console.error('Error creating infor:', error);
//         alert("Đã xảy ra lỗi trong quá trình đặt hàng.");
//     }
// }
//   return (
//     <div>

//         <main class="col-md-9">
//         <div class="row">
//         {address.length>0 && address.map((row)=>(
//             <div class="col-md-6">
//             <article class="box mb-4">
//                 <h6>{t=t+1}</h6>
//                 <p>Tên:{row.fullname}</p>
//                 <p>địa chỉ:{row.address}</p>
//                 <p>số điện thoai:{row.phone_number}</p>
//                 {row.status === 1 ?(
//                     <span >
//                        <a href="#" class="btn btn-light disabled"> <i class="fa fa-check"></i> Default</a> 
//                     </span>
//                 ):(
//                     <span>
//                     <a href="#" class="btn btn-light" onClick={()=>{updateStatus(row)}}>Make default</a> 
//                     </span>
//                 )}
//                  <a href="#" class="btn btn-light"onClick={()=>native(`/UpdateAddress?ID=${row.id}&`)}> <i class="fa fa-pen"></i> </a>  
//                  <a href="#" class="btn btn-light" onClick={()=>{deletId(row)}}> <i class="text-danger fa fa-trash"></i>  </a>
             
//             </article>
//         </div>  
//         ))}
//         </div> 
// 	</main> 
    
//     <div class="container mt-5">
//     <div class="row justify-content-center">
//         <div class="col-md-6">
//             <div class="card">
//                 <div class="card-header">Nhập thông tin nhận hàng:</div>
//                 <div class="card-body">
                
//                     <form >
//                         <div class="form-group">
//                             <label>Tên người nhận:</label>
//                             <input
//                                 type="text"
//                                 class="form-control"
//                                 name="fullname"
//                                 value={infor.fullname}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
                        
//                         <div class="form-group">
//                             <label>so dien thoai</label>
//                             <input
//                                 type="text"
//                                 class="form-control"
//                                 name="phone_number"
//                                 value={infor.phone_number}
//                                 onChange={handleInputChange}

//                             />
//                         </div>
                       
//                         <div class="form-group">
//                             <label>Nơi nhận hàng</label>
//                             <input
//                                 type="text"
//                                 class="form-control"
//                                 name="address"
//                                 value={infor.address}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
                      
//                         <button type="submit" class="btn btn-primary" onClick={(e)=>{handleLogin(e)}}>ADD</button>
//                     </form>
//                     <div class="mt-3 ">
//                         <span>bạn đã có địa chỉ muốn giao đến hãy nhấn   <Link to="/" class="btn btn-primary" onClick={(e)=>{handle(e)}}>tiếp theo</Link></span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
// </div>
//   );
// };

// export default AddAddress;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DELETE_ID, PUT_CART } from "../../api/apiService";
import axios from 'axios';

const AddAddress = () => {
  const navigate = useNavigate();
  
  const [infor, setInfor] = useState({
    fullname: '',
    phone_number: '',
    address: ''
  });
  const [addressList, setAddressList] = useState([]);

  // Cập nhật trạng thái địa chỉ mặc định
  const updateStatus = async (row) => {
    try {
      const res = await PUT_CART(`address/status`, row.id);
      console.log(res.data);
      loadAddress();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  // Xóa địa chỉ
  const deleteAddress = async (row) => {
    try {
      await DELETE_ID(`address/${row.id}`);
      console.log("Đã xóa thành công");
      loadAddress();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // Lấy danh sách địa chỉ
  const loadAddress = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/address/user', {
        withCredentials: true
      });
      if (!res.data || res.data.length === 0) {
        console.log("Không có địa chỉ nào.");
      }
      setAddressList(res.data || []);
    } catch (err) {
      console.error("Lỗi khi load địa chỉ:", err);
    }
  };

  // Lấy thông tin user
  const getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/infor', {
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      console.error("Có lỗi khi lấy thông tin user:", err);
      return null;
    }
  };

  // Lấy giỏ hàng
  const getCart = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orderdetail/all', {
        withCredentials: true
      });
      return res.data || [];
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      return [];
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfor(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý đặt hàng
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authStatus = await getUserInfo();
      console.log(authStatus);
      if (!authStatus || authStatus === "chua dang nhap") {
        alert("Bạn chưa đăng nhập.");
        return navigate("/login");
      }

      const cart = await getCart();
      if (!cart || cart.length === 0) {
        alert("Hãy thêm sản phẩm vào giỏ hàng");
        return navigate("/");
      }
     
  console.log("dia chi :", addressList);
 if (!addressList || addressList.length === 0) {
      if (!infor.fullname || infor.fullname.length < 3) {
        return alert("Chưa có tên người nhận");
      }
      if (!infor.phone_number || infor.phone_number.length < 10) {
        return alert("Số điện thoại không hợp lệ");
      }
      if (!infor.address || infor.address.length < 3) {
        return alert("Địa chỉ người nhận không đúng");
      }

      // Thêm địa chỉ mới
      await axios.post(`http://localhost:8080/api/address`, infor, {
        withCredentials: true,
      });
    }

    // Tạo đơn hàng
    await axios.post(`http://localhost:8080/api/orders`, {}, {
      withCredentials: true,
    });

    alert("Đã đặt hàng thành công.");
    navigate("/");
    
     }catch (error) {
      console.error("Error creating order:", error);
      alert("Đã xảy ra lỗi trong quá trình đặt hàng.");
    }
  };

  return (
    <div>
      <main className="col-md-9">
        <div className="row">
          {addressList.length > 0 ? (
            addressList.map((row, index) => (
              <div className="col-md-6" key={row.id}>
                <article className="box mb-4">
                  <h6>{index + 1}</h6>
                  <p>Tên: {row.fullname}</p>
                  <p>Địa chỉ: {row.address}</p>
                  <p>Số điện thoại: {row.phone_number}</p>
                  {row.status === 1 ? (
                    <span>
                      <button className="btn btn-light disabled">
                        <i className="fa fa-check"></i> Default
                      </button>
                    </span>
                  ) : (
                    <span>
                      <button className="btn btn-light" onClick={() => updateStatus(row)}>Make default</button>
                    </span>
                  )}
                  <button className="btn btn-light" onClick={() => navigate(`/UpdateAddress?ID=${row.id}`)}>
                    <i className="fa fa-pen"></i>
                  </button>
                  <button className="btn btn-light" onClick={() => deleteAddress(row)}>
                    <i className="text-danger fa fa-trash"></i>
                  </button>
                </article>
              </div>
              
            ))
          )
           : (
            <p className="p-3">Không có địa chỉ nào</p>
          )}
        </div>
      </main>
     {/* {addressList.length > 0 ? (
      <div>
        <a href="#" class="btn btn-light mb-3" onClick={()=> navigate("/fromAddress")}> <i class="fa fa-plus"></i> Add new address </a>
      </div>)
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Nhập thông tin nhận hàng:</div>
              <div className="card-body">
                :(
                <form>
                  <div className="form-group">
                    <label>Tên người nhận:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      value={infor.fullname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone_number"
                      value={infor.phone_number}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Nơi nhận hàng</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={infor.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                    ADD
                  </button>
                </form>
)}
                <div className="mt-3">
                  <span>
                    Bạn đã có địa chỉ muốn giao đến hãy nhấn  
                    <Link to="/" className="btn btn-primary" onClick={handleLogin}>
                      Tiếp theo
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   */}
      {addressList.length > 0 ? (
  <div>
    <a
      href="#"
      className="btn btn-light mb-3"
      onClick={() => navigate("/fromAddress")}
    >
      <i className="fa fa-plus"></i> Add new address
    </a>

    <div className="mt-3">
      <span>
        Bạn đã có địa chỉ muốn giao đến hãy nhấn{" "}
        <Link to="/" className="btn btn-primary" onClick={handleLogin}>
          Tiếp theo
        </Link>
      </span>
    </div>
  </div>
) : (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Nhập thông tin nhận hàng:</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Tên người nhận:</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={infor.fullname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={infor.phone_number}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nơi nhận hàng</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={infor.address}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                ADD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AddAddress;