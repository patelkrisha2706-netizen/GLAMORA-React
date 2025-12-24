import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmpassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmpassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const existingUser = await axios.get(`http://localhost:3001/admin?email=${formData.email}`);
    if (existingUser.data.length > 0) {
      alert('Email already registered');
      return;
    }
    await axios.post('http://localhost:3001/admin', {
      email: formData.email,
      password: formData.password,
    });

    alert('Registration successful!');
    navigate('/login');
  } catch (err) {
    console.error('Registration error:', err);
    if (err.response) {
      alert(`Error: ${err.response.status} - ${err.response.statusText}`);
    } else {
      alert('Network or server error. Please check your backend.');
    }
  }
};


  return (
    <div className="d-flex w-100 justify-content-center align-items-center vh-100">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Admin Registration</h2>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-info w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
