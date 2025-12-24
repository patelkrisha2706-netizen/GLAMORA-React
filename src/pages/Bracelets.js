import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Necklace.css";

const Bracelets = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const categoryId = 4;

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // ✅ Fetch all products ONCE
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/products?cid=${categoryId}`);
      const shuffled = shuffleArray(res.data);
      setAllProducts(shuffled);
      setProducts(shuffled.slice(0, 8)); // show 8 initially
    } catch (err) {
      console.error("Error fetching bracelet products:", err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // ✅ Load more from already fetched data (no refetch)
  const loadMoreProducts = () => {
    const nextCount = displayCount + 8;
    const nextProducts = allProducts.slice(0, nextCount);
    setProducts(nextProducts);
    setDisplayCount(nextCount);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]); // ✅ clean useEffect

  const hasMore = products.length < allProducts.length;

  return (
    <div>
      <Header />

      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/image/bracletecoverpage.jpg"
              className="d-block w-100"
              alt="Bracelet Cover"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Bracelet Collection</h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {products.length === 0 && !loading && (
            <p className="text-muted text-center">No bracelet products found.</p>
          )}

          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card product-card position-relative shadow-sm border-0">
                <img
                  src={
                    p.image.startsWith("/image") ? p.image : `/image/${p.image}`
                  }
                  alt={p.pname}
                  className="card-img-top product-img p-3"
                  style={{
                    height: "220px",
                    width: "220px",
                    objectFit: "contain",
                    margin: "auto",
                  }}
                />
                <div className="card-body text-center px-2">
                  <p className="mb-1 fw-bold">{p.pname}</p>
                  <p className="text-muted small mb-1">
                    {p.description?.length > 60
                      ? `${p.description.slice(0, 60)}...`
                      : p.description || "Elegant bracelet"}
                  </p>
                  <div>
                    <span className="fw-bold text-success">₹{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-muted ms-2 text-decoration-line-through">
                        ₹{p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-dark"
              onClick={loadMoreProducts}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <p className="text-center mt-3 text-muted">
            No more bracelet products to load.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bracelets;
