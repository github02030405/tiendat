import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { POST_ADD } from '../../api/apiService';

const Registerr = () => {
    const [user, setUser] = useState({
        fullname: '',
        phone_number: '',
        password: '',
        email: '',
        profileImage: null // New field for file upload
    });
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
            fullname: user.fullname,
            phone_number: user.phone_number,
            password: user.password,
            email: user.email
        })], { type: 'application/json' }));
        if (user.profileImage) {
            formData.append('file', user.profileImage); // Add file to form data
        }
       
        try {
            const response = await POST_ADD(`user/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', }
            });

            if (response.data === "Email already exists") {
                alert("Email đã tồn tại");
            }
            else {
                alert("Tạo tài khoản thành công");
                navigate('/login');
            }
        } catch (error) {
             if(user.phone_number.length <10){
                 alert("số điện thoại không hợp lệ");
            } else{
            console.error("Registration failed:", error);
            alert("Đăng ký không thành công");
            }
            
        }
    };

    return (
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Registration</div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label>Your  Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        value={user.fullname}
                                        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Your Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        value={user.phone_number}
                                        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Upload Profile Image</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        onChange={(e) => setUser({ ...user, profileImage: e.target.files[0] })}
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={handleRegister}>
                                    Register
                                </button>
                            </form>
                            <div class="mt-3">
                                <span>Already registered? <Link to="/login">Login here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registerr;