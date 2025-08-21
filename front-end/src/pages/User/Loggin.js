import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const Loggin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleLogin =  (e) => {
        e.preventDefault();
        try {
        axios.post(`http://localhost:8080/api/user/login`,{email,password},{
            withCredentials: true // Để gửi cookie (session) nếu cần
        }).then((response)=>{
            if(response.data == "Login successful"){
                alert("Login successful");
                navigate(`/`)
            }
           else{
                alert("sai mat or email");
            }
        })
    }
    catch (error) {
        setMessage('Registration failed');
    }
        }
    return (
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Login Form</div>
                        <div class="card-body">
                        {message && <div class="alert alert-info">{message}</div>}
                            <form onSubmit={handleLogin}>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        value={email}
                                        
                                        onChange={(e) => setEmail(  e.target.value )}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary" >Login</button>
                            </form>
                            <div class="mt-3">
                                <span>Not registered? <Link to="/register" style={{color:'orange'}}>Register here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loggin;
