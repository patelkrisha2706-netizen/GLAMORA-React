import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ admin, setAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdmin(null);
    navigate('/login');
  };

  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '220px' }}>
      <h5>Admin Panel</h5>
      {admin && <p className="small">{admin.email}</p>}
      <hr />
      <ul className="nav flex-column">
        <li><Link to="/insert" className="nav-link text-white">Add Category</Link></li>
        <li><Link to="/products/add" className="nav-link text-white">Add Product</Link></li>
        <li><Link to="/home" className="nav-link text-white">Read Category</Link></li>
        <li><Link to="/products/read" className="nav-link text-white">Read Product</Link></li>
        <li><Link to="/manage-user" className="nav-link text-white">Manage User</Link></li>
        <li><Link to="/manage-feedback" className="nav-link text-white">Manage Feedback</Link></li>
        <li><Link to="/manage-order" className="nav-link text-white">Manage Order</Link></li>
        <li>
          <button className="btn btn-sm btn-danger mt-2" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
