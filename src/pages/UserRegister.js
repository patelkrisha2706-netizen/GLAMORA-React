import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uid: '',
    uname: '',
    uemail: '',
    password: '',
    confirmpassword: '',
    gender: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

   
    const dataToSend = {
      uid: formData.uid,
      uname: formData.uname,
      uemail: formData.uemail,
      password: formData.password,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      status: 'Active', // optional default status
      created_at: new Date().toISOString(), // automatically store current date & time
    };

    try {
      await axios.post('http://localhost:3001/user', dataToSend);
      alert('Registration successful!');
      navigate('/user-login');

      setFormData({
        uid: '',
        uname: '',
        uemail: '',
        password: '',
        confirmpassword: '',
        gender: '',
        address: '',
        phone: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register user. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: 450,
        margin: '30px auto',
        padding: '25px',
        borderRadius: 10,
        backgroundColor: '#f0f8ff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: 25, color: '#004080' }}>
        Registration Form
      </h3>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '100%' }}>
          <tbody>
            {[
              { label: 'User ID:', name: 'uid', type: 'text' },
              { label: 'Username:', name: 'uname', type: 'text' },
              { label: 'Email:', name: 'uemail', type: 'email' },
              { label: 'Password:', name: 'password', type: 'password' },
              { label: 'Confirm Password:', name: 'confirmpassword', type: 'password' },
              { label: 'Gender:', name: 'gender', type: 'select', options: ['Female', 'Male', 'Other'] },
              { label: 'Address:', name: 'address', type: 'text' },
              { label: 'Phone:', name: 'phone', type: 'tel' },
            ].map(({ label, name, type, options }) => (
              <tr key={name} style={{ marginBottom: 12 }}>
                <td style={{
                  padding: '8px 12px',
                  verticalAlign: 'middle',
                  fontWeight: '600',
                  color: '#003366',
                  width: '40%',
                }}>
                  <label htmlFor={name}>{label}</label>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  {type === 'select' ? (
                    <select
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: 8,
                        borderRadius: 5,
                        border: '1px solid #99c2ff',
                        backgroundColor: '#e6f0ff',
                        color: '#003366',
                      }}
                    >
                      <option value="">Select Gender</option>
                      {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: 8,
                        borderRadius: 5,
                        border: '1px solid #99c2ff',
                        backgroundColor: '#e6f0ff',
                        color: '#003366',
                      }}
                      {...(name === 'phone' ? { pattern: '\\d{10}', title: 'Enter 10 digit phone number' } : {})}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: 25 }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 28px',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: 16,
              boxShadow: '0 3px 6px rgba(0, 123, 255, 0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegister;
