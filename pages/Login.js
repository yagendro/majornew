import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        phone,
        password,
      });
      console.log('User logged in:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/home-after-login');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect password. Please enter a valid password.');
      } else if (error.response && error.response.status === 404) {
        setError('User not found. Please sign up.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;