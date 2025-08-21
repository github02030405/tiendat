import React, { useState } from 'react';
import {Link} from'react-router-dom';
import { GET_CART, POST_CART, PUT_ADD } from "../../api/apiService";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
const UpdateAddress = () => {
    const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
    let InforId = queryParams.get("ID");
  const native=useNavigate();
  // Khai báo state để lưu trữ dữ liệu add
  const [infor, setInfor] = useState({
    fullname:'',
    phone_number:'',
    address: ''
  });
  // Hàm xử lý khi nhập dữ liệu vào form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfor({
      ...infor, 
      [name]: value
    });
  };
const handleLogin = async  (e) => {
            try {
                e.preventDefault();
            if(infor.fullname.length>=3 && infor.phone_number.length>=9 && infor.address.length>3){
              PUT_ADD(`address/${InforId}`,infor)
                alert("đã sửa địa chỉ thành công");
                native("/");
                return
            }
            else{
                return alert("Hãy điền đầy đủ thông tin nhận hàng ");
            }
        }
        catch (error) {
            console.error('Error creating infor:', error);
            alert("Đã xảy ra lỗi trong quá trình đặt hàng.");
        }
    }
  return (
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Nhập thông tin nhận hàng:</div>
                <div class="card-body">
                
                    <form >
                        <div class="form-group">
                            <label>Tên người nhận:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="fullname"
                                value={infor.fullname}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div class="form-group">
                            <label>so dien thoai</label>
                            <input
                                type="text"
                                class="form-control"
                                name="phone_number"
                                value={infor.phone_number}
                                onChange={handleInputChange}

                            />
                        </div>
                       
                        <div class="form-group">
                            <label>Nơi nhận hàng</label>
                            <input
                                type="text"
                                class="form-control"
                                name="address"
                                value={infor.address}
                                onChange={handleInputChange}
                            />
                        </div>
                      
                        <button type="submit" class="btn btn-primary" onClick={(e)=>{handleLogin(e)}}>Update</button>
                    </form>
                  
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default UpdateAddress;