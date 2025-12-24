import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [product, setProduct] = useState({
    pname: "",
    description: "",
    image: "",
    price: "",
    cid: "",
    created_at: "" // optional, initially empty
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
        alert("Failed to load product. Please check the product ID.");
      }
    };

    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchProduct();
    loadCategories();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        price: Number(product.price),
        cid: Number(product.cid),
        created_at: product.created_at || new Date().toISOString() // set if missing
      };

      await axios.put(`http://localhost:3001/products/${id}`, updatedProduct);
      navigate("/products/read");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="d-flex">
      <div className="container mt-5">
        <h2>Edit Product</h2>
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

          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;