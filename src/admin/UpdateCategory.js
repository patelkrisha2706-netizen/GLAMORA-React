import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCategory() {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    cid: '',
    cname: '',
    description: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/category/${id}`)
      .then(res => {
        setInputData({
          cid: res.data.cid,
          cname: res.data.cname,
          description: res.data.description,
        });
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Failed to fetch category data.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/category/${id}`, inputData)
      .then(() => {
        alert('Category updated successfully!');
        navigate('/home');  
      })
      .catch(err => {
        console.error('Update error:', err);
        alert('Failed to update category.');
      });
  };

  return (
    <div className="d-flex">
      <div className="container mt-5">
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cid" className="form-label">Category ID</label>
            <input
              type="text"
              name="cid"
              className="form-control"
              value={inputData.cid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cname" className="form-label">Category Name</label>
            <input
              type="text"
              name="cname"
              className="form-control"
              value={inputData.cname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={inputData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCategory;
