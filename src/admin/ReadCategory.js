import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ReadCategory() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:3001/category')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios.delete('http://localhost:3001/category/' + id)
        .then(() => {
          alert("Record deleted");
          fetchData();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <h2 className="mb-4">Categories</h2>
        <Link to="/insert" className="btn btn-success mb-3">Create +</Link>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Category Id</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.cid}</td>
                <td>{d.cname}</td>
                <td>{d.description}</td>
                <td>
                  <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary me-2">Update</Link>
                  <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadCategory;
