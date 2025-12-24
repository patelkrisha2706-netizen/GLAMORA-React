import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserLogin({ setUser }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:3001/user', {
        params: {
          uemail: inputData.email,
          password: inputData.password,
        },
      });

      if (res.data.length > 0) {
        const loggedInUser = res.data[0];

        //  Check if user is blocked
        if (loggedInUser.status === 'Block') {
          alert('Your account is blocked.');
          return;
        }

      
        setUser(loggedInUser);

        //  Sve entire user object in localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        alert('Login successful!');
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">User Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={inputData.email}
              onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={inputData.password}
              onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/user-register">Don't have an account? Register here</Link>
          <p className="mt-2 mb-0 text-muted">or</p>
          <Link to="/">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;