import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:3001/admin', {
        params: { email },
      });

      if (res.data.length > 0) {
        alert(`Your password is: ${res.data[0].password}`);
        navigate('/login');
      } else {
        alert('No account found with this email.');
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter your email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Show Password</button>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
