

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const Setting=()=>{
//     const [user, setUser] = useState({
// 		fullname: '',
// 		phone_number:'',
// 		address: '',
// 		email:''
// 	});
// 	const [password,setPassword]=useState({
// 		oldPassword: '',
// 		newPassword:''
// 	});
// 	const update = async (e) => {
// 		e.preventDefault();
//         try {
//                 axios.put(`http://localhost:8080/api/user`,user,{
//                 withCredentials: true 
//             }).then((props)=>{
// 				setUser(props.data); 
// 				console.log(props.data)
// 				fetchUserData();
// 			});
//             // Lưu dữ liệu vào state
//         }catch (err) {
// 			console.log(err.response ? err.response.data : "Có lỗi xảy ra khi lấy thông tin người dùng.");
//         }
//     };
// 	const changePassword=()=>{
// 		try {
// 			axios.put(`http://localhost:8080/api/user/password`,password,{
// 			withCredentials: true 
// 		}).then((response)=>{
// 			alert(response.data);
// 		})
// 		// Lưu dữ liệu vào state
// 	}catch (err) {
// 		console.log(err.response ? err.response.data : "Có lỗi xảy ra khi lấy thông tin người dùng.");
// 	}
// 	}
// 	const handleChange=(e)=>{
// 		const{name,value}=e.target;
// 		setUser((data)=>({
// 			...data,
// 			[name]:value,
// 		}));
// 	};
// 	const handleChangePw=(e)=>{
// 		const{name,value}=e.target;
// 		setPassword((data)=>({
// 			...data,
// 			[name]:value,
// 		}));
// 	};
//     const fetchUserData = async () => {
//         try {
//                 axios.get('http://localhost:8080/api/user/infor',{
//                 withCredentials: true 
//             }).then((props)=>{
// 				setUser(props.data); 
// 				console.log(props.data)

// 			});
//             // Lưu dữ liệu vào state
//         }catch (err) {
// 			console.log(err.response ? err.response.data : "Có lỗi xảy ra khi lấy thông tin người dùng.");
//         }
//     };
// 	const logout=()=>{
// 		try {
// 			axios.get('http://localhost:8080/api/user/logout',{
// 			withCredentials: true 
// 		}).then((props)=>{
// 			alert(props.data)
// 		})
		
// 		// Lưu dữ liệu vào state
// 	}catch (err) {
// 		console.log(err.response ? err.response.data : "Có lỗi xảy ra khi lấy thông tin người dùng.");
// 	}
// 	}
//     useEffect(() => { 
//         fetchUserData();
//     }, []); // Chỉ chạy 1 lần khi component mount
//     return(
// <section class="section-content padding-y">
// 	<div class="container">
	
// 	<div class="row">
// 		<aside class="col-md-3">
// 			<nav class="list-group">
//                      <a class="list-group-item " href="page-profile-main.html"> Account overview  </a>
// 					<a class="list-group-item " href="ProfileAddress"> My Address </a>
// 					<a class="list-group-item " href="ProfileOrders"> My Orders </a>
// 					<a class="list-group-item" href="page-profile-wishlist.html"> My wishlist </a>
// 					<a class="list-group-item" href="page-profile-seller.html"> My Selling Items </a>
// 					<a class="list-group-item active" href="ProfileSetting"> Settings </a>
// 					<a class="list-group-item  list-group-item-primary" href="page-index-1.html" onClick={logout}> Log out </a>
// 			</nav>
// 		</aside> 
// 		<main class="col-md-9">

// 		<div class="card">
//       <div class="card-body">
//      <form class="row">
//      	<div class="col-md-9">
//      		<div class="form-row">
// 				<div class="col form-group">
// 					<label>fullname</label>
// 				  	<input type="text" class="form-control" name="fullname"value={user.fullname}onChange={handleChange}/>
// 				</div> 
// 				<div class="col form-group">
// 					<label>Email</label>
// 				  	<input type="email" class="form-control"name="email" value={user.email} onChange={handleChange}/>
// 				</div> 
// 			</div> 
// 			<div class="form-row">
// 				<div class="form-group col-md-6">
// 				  <label>Nơi ở hiện tại:</label>
// 				  <input type="text" class="form-control"name="address" value={user.address}onChange={handleChange}/>
// 				</div> 
// 				<div class="form-group col-md-6">
// 				  <label>Phone</label>
// 				  <input type="text" class="form-control"name="phone_number" value={user.phone_number}onChange={handleChange} />
// 				</div> 
// 			</div>
			
// 			<div class="form-row">
// 				<div class="form-group col-md-6">
// 				  <label>present password</label>
// 				  <input type="password" class="form-control"name="oldPassword" value={password.oldPassword}onChange={handleChangePw} />
// 				</div> 
// 			</div> 
// 			<div class="form-row">
// 				<div class="form-group col-md-6">
// 				  <label>new password</label>
// 				  <input type="password" class="form-control"name="newPassword" value={password.newPassword}onChange={handleChangePw} />
// 				</div> 
// 			</div> 

// 			<button class="btn btn-primary"onClick={update}>Save</button>	
// 			<button class="btn btn-light"onClick={changePassword}>Change password</button>	

// 			<br/><br/><br/><br/><br/><br/>
//      	</div> 
//      	<div class="col-md">
//      		<img src="images/avatars/avatar1.jpg" class="img-md rounded-circle border"/>
//      	</div>  
//       </form>
//       </div> 
//     </div> 

// 	</main> 
// </div>

// </div> 
// </section>
//     )

// }
// export default Setting;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Setting = () => {
    const [user, setUser] = useState({
        fullname: '',
        phone_number: '',
        address: '',
        email: '',
        thumbnail: null // Added for storing the uploaded image
    });

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: ''
    });

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setUser((prev) => ({
            ...prev,
            thumbnail: file // Store the selected file
        }));
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
            fullname: user.fullname,
            phone_number: user.phone_number,
            address: user.address,
            email: user.email
        })], { type: 'application/json' }));
        if (user.thumbnail) {
            formData.append('file', user.thumbnail); // Add file to form data
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/user`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            setUser(response.data); 
            console.log(response.data);
            fetchUserData();
        } catch (err) {
            console.log(err.response ? err.response.data : "Có lỗi xảy ra khi cập nhật thông tin người dùng.");
        }
    };
    const changePassword = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/user/password`, password, {
                withCredentials: true 
            });
            alert(response.data);
        } catch (err) {
            console.log(err.response ? err.response.data : "Có lỗi xảy ra khi thay đổi mật khẩu.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleChangePw = (e) => {
        const { name, value } = e.target;
        setPassword((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/infor', {
                withCredentials: true 
            });
            setUser(response.data); 
            console.log(response.data);
        } catch (err) {
            console.log(err.response ? err.response.data : "Có lỗi xảy ra khi lấy thông tin người dùng.");
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/logout', {
                withCredentials: true 
            });
            alert(response.data);
        } catch (err) {
            console.log(err.response ? err.response.data : "Có lỗi xảy ra khi đăng xuất.");
        }
    };

    useEffect(() => { 
        fetchUserData();
    }, []); // Chỉ chạy 1 lần khi component mount

    return (
        <section class="section-content padding-y">
            <div class="container">
                <div class="row">
                    <aside class="col-md-3">
                        <nav class="list-group">
                            <a class="list-group-item" href="ProfileAddress"> My Address </a>
                            <a class="list-group-item" href="ProfileOrders"> My Orders </a>
                            <a class="list-group-item active" href="ProfileSetting"> Settings </a>
                            <a class="list-group-item list-group-item-primary" href="page-index-1.html" onClick={logout}> Log out </a>
                        </nav>
                    </aside> 
                    <main class="col-md-9">
                        <div class="card">
                            <div class="card-body">
                                <form class="row">
                                    <div class="col-md-9">
                                        <div class="form-row">
                                            <div class="col form-group col-md-6">
                                                <label>Full Name</label>
                                                <input type="text" class="form-control" name="fullname" value={user.fullname} onChange={handleChange} />
                                            </div> 
                                            
                                          
                                        </div> 
                                          <div class="form-row">
                                              <div class="col form-group col-md-6">
                                                <label>Email</label>
                                                <input type="email" class="form-control" name="email" value={user.email} onChange={handleChange} />
                                            </div> 
                                          </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Phone</label>
                                                <input type="text" class="form-control" name="phone_number" value={user.phone_number} onChange={handleChange} />
                                            </div> 
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Present Password</label>
                                                <input type="password" class="form-control" name="oldPassword" value={password.oldPassword} onChange={handleChangePw} />
                                            </div> 
                                        </div> 
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>New Password</label>
                                                <input type="password" class="form-control" name="newPassword" value={password.newPassword} onChange={handleChangePw} />
                                            </div> 
                                        </div> 
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Upload Avatar</label>
                                                <input type="file" class="form-control" accept="image/*" onChange={handleImageChange} />
                                            </div> 
                                        </div>
                                        <button class="btn btn-primary" onClick={update}>Save</button>	
                                        <button class="btn btn-light" onClick={changePassword}>Change Password</button>	
                                        <br/><br/><br/><br/><br/><br/>
                                    </div> 
                                    <div class="col-md" >
                                        <img src={`/images/user/${user.thumbnail}`} class="img-md rounded-circle border" alt="User Avatar"  />
                                    </div>  
                                </form>
                            </div> 
                        </div> 
                    </main> 
                </div>
            </div> 
        </section>
    )
}

export default Setting;