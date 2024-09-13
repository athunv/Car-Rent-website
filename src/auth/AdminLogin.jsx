import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tokenGenerate } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const getLoginData = (e) => {
    e.preventDefault();
    console.log(loginData);

    const { username, password } = loginData;
    if (!username || !password) {
      toast.warning('Invalid data');
    } else {
      tokenGenerate(loginData).then((res) => {
        console.log(res.data);
        sessionStorage.setItem('token', res.data.token);
        toast.success('Login successful');
        navigate('/admin');
      }).catch((error) => {
        toast.error('Login failed');
        console.error('Error logging in:', error);
      });
    }
  };

  return (
    <div>
      <style>
        {`
          .container {
            background-color: #1e1e1e;
            color: #f5f5f5;
            padding: 30px;
            border: 1px solid orange;
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
          <h1> Admin Login</h1>
          <form onSubmit={getLoginData}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className='form-control'
              placeholder='Enter username'
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              className='form-control'
              placeholder='Enter password'
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type='submit' className='btn mb-4' >Login</button>
            <Link to={'/home'} style={{textDecoration:'none' ,color:'white'}} className=''>Back to Home</Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
