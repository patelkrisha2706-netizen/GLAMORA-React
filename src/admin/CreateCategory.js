import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Category.css';

function CreateCategory() {
  const [inputData, setInputData] = useState({
    cid: "",
    cname: "",
    description: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/category", inputData);
      alert("Data added Successfully!");
      navigate("/Home");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-category-container">
      <h2 className="form-title">Add New Category</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cid">Category Id</label>
          <input
            type="text"
            id="cid"
            name="cid"
            value={inputData.cid}
            onChange={handleChange}
            required
            placeholder="Enter category id"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cname">Category Name</label>
          <input
            type="text"
            id="cname"
            name="cname"
            value={inputData.cname}
            onChange={handleChange}
            required
            placeholder="Enter category name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={inputData.description}
            onChange={handleChange}
            required
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
