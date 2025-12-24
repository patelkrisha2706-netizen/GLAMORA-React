import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageUser() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user) => {
    const updatedUser = {
      ...user,
      status: user.status === 'Active' ? 'Block' : 'Active',
    };

    try {
      await axios.put(`http://localhost:3001/user/${user.id}`, updatedUser);
      fetchUsers(); // Refresh data
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3001/user/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>User Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#131212ff',color:'white' }}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                <td>{user.uid}</td>
                <td>{user.uname}</td>
                <td>{user.uemail}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>

                <td>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    style={{
                      backgroundColor: user.status === 'Active' ? '#28a745' : '#dc3545',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      minWidth: '80px',
                    }}
                  >
                    {user.status === 'Active' ? 'Active' : 'Blocked'}
                  </button>
                </td>

                <td>{user.created_at}</td>

                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;
