import React, { useState } from 'react';
import axios from 'axios';
import { color } from 'chart.js/helpers';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/forgot-password/', { email, username });
      setMessage(response.data.message);
      setError('');
      setIsCodeSent(true);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setMessage('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/reset-password/reset_password/', {
        username,
        email,
        reset_code: resetCode,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.f1}>
          <h2 style={styles.heading}>Forgot Password</h2>
          {!isCodeSent ? (
            <form onSubmit={handleRequestCode} style={styles.form}>
              <label htmlFor="username" style={styles.label}>Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
              <label htmlFor="email" style={styles.label}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Submit</button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} style={styles.form}>
              <label htmlFor="resetCode" style={styles.label}>Reset Code:</label>
              <input
                type="text"
                id="resetCode"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
                style={styles.input}
              />
              <label htmlFor="newPassword" style={styles.label}>New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Reset Password</button>
              
            </form>
          )}
          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <Link to={'/login'} style={{textDecoration:'none' ,color:'white', marginLeft:'310px'}} className='mt-4'>Back to Login</Link>
      </div>
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'black',
    
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color:'white'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    
  },
  label: {
    fontSize: '1rem',
    marginBottom: '10px',
    color:'white'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid orange',
    backgroundColor:'#333'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: 'orange',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  f1:{
    border:'1px solid orange',
    width:'500px',
    padding:'20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default ForgotPassword;
