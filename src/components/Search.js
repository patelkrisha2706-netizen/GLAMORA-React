import React, { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter products by name
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="container mt-4">
      <h2>Search Products</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-3">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.pname}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{product.pname}</h6>
                  <p className="card-text">₹ {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
