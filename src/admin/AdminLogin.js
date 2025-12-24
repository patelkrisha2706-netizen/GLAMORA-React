import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin({ setAdmin }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:3001/admin', {
        params: {
          email: inputData.email,
          password: inputData.password,
        },
      });

      if (res.data.length > 0) {
        setAdmin(res.data[0]); // set the logged-in admin
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="d-flex w-100 justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Admin Login</h2>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={inputData.email}
              onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={inputData.password}
              onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
              required
            />
          </div>

          <button className="btn btn-info w-100">Login</button>

          <div className="text-center mt-3">
            <Link to="/admin-forgot-password" className="text-white">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
