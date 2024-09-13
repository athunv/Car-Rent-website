import React, { useState } from 'react';
import { userRegister } from '../services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const userRegisterData = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
  
    if (!username || !email || !password) {
      toast.warning("All fields are required.");
    } else if (password.length < 6) {
      toast.warning("Password must be at least 6 characters long.");
    } else {
      try {
        const res = await userRegister(userData);
        if (res.status === 201) {  
          toast.success("User registered successfully");
          setUserData({
            username: '',
            email: '',
            password: '',
          });
          navigate('/login');
        } else {
          toast.error("Registration failed. Please check the details and try again.");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          
          toast.error(error.response.data.detail || "An error occurred. Please try again.");
        } else {
          
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };
    return (
    <>
      <style>
        {`
          .container {
            background-color: #1e1e1e;
            color: #f5f5f5;
            padding: 30px;
            border:1px solid orange;
            border-radius: 10px;
            max-width: 600px;
            margin: 50px auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          .form-control {
            background-color: #2a2a2a;
            color: #f5f5f5;
            border: 1px solid orange;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 15px;
            width: 100%;
          }
          .form-control::placeholder {
            color: #888;
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          .btn {
            background-color: orange;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: rgb(240, 151, 69);
          }
        `}
      </style>
      <div className='container'>
        <div>
          <h1>Register</h1>
          <form onSubmit={userRegisterData}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className='form-control'
              placeholder='Enter username'
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              value={userData.username}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className='form-control'
              placeholder='Enter email'
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              value={userData.email}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className='form-control'
              placeholder='Enter password'
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              value={userData.password}
            />
            <button type='submit' className='btn mb-4'>Register</button>
            <Link to={'/login'} style={{textDecoration:'none' ,color:'white'}} className='mt-4'>Back to Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
