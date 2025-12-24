import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [product, setProduct] = useState({
    pname: "",
    description: "",
    image: "",
    price: "",
    cid: ""
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...product,
        price: Number(product.price), // convert price to number
        cid: Number(product.cid),
        created_at: new Date().toISOString() // automatically add current timestamp
      };
      await axios.post("http://localhost:3001/products", newProduct);
      navigate("/products/read"); 
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="d-flex">
      <div className="container mt-5">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="pname"
              value={product.pname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="form-control"
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="cid"
              value={product.cid}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.cid} value={cat.cid}>
                  {cat.cname}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;