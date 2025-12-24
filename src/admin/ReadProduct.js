import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";

function ReadProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit] = useState(50); // Number of products to fetch
  const [offset, setOffset] = useState(0); // For Load More functionality
  const [hasMore, setHasMore] = useState(true); // To check if more products exist

  const loadData = async (currentLimit = limit, currentOffset = offset) => {
  try {
    const prodRes = await axios.get(
      `http://localhost:3001/products`
    );

    const catRes = await axios.get("http://localhost:3001/category");

    // Sort all products by created_at descending
    const sortedProducts = prodRes.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // For pagination manually slice the array
    const paginatedProducts = sortedProducts.slice(currentOffset, currentOffset + currentLimit);

    // On first load, replace products; on load more, append
    setProducts((prev) => currentOffset === 0 ? paginatedProducts : [...prev, ...paginatedProducts]);
    setCategories(catRes.data);

    if (paginatedProducts.length < currentLimit) {
      setHasMore(false);
    }
  } catch (err) {
    console.error("Failed to load data:", err);
  }
};

  // Delete product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  // Load more products on button click
  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadData(limit, newOffset);
  };

  useEffect(() => {
    loadData(); //this is used before a useEffect to suppress warnings about missing dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 className="mb-4">Product List</h2>
        <Link to="/products/add" className="btn btn-primary mb-3">
          Add Product
        </Link>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => {
              const category = categories.find((cat) => cat.cid === prod.cid);
              return (
                <tr key={prod.id}>
                  <td>
                    <img
                      src={prod.image}
                      alt={prod.pname}
                      width="50"
                      height="50"
                      className="img-thumbnail"
                    />
                  </td>
                  <td>{prod.pname}</td>
                  <td>{prod.description}</td>
                  <td>₹{prod.price}</td>
                  <td>{category ? category.cname : "No Category"}</td>
                  <td>
                    <Link
                      to={`/products/edit/${prod.id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {hasMore && (
          <div className="text-center mt-3">
            <button onClick={handleLoadMore} className="btn btn-outline-dark">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadProduct;