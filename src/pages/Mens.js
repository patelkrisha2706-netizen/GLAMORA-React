import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Necklace.css"; // Optional – for consistent styling

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const categoryId = 5; // Men's category ID

  // Shuffle products for random display
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // ✅ Fetch all products once and randomize them
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/products?cid=${categoryId}`);
      const shuffled = shuffleArray(res.data);
      setAllProducts(shuffled);
      setProducts(shuffled.slice(0, 8)); // Display first 8
    } catch (err) {
      console.error("Error fetching men's products:", err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // ✅ Load more products from already-fetched data
  const loadMoreProducts = () => {
    const nextCount = displayCount + 8;
    const nextProducts = allProducts.slice(0, nextCount);
    setProducts(nextProducts);
    setDisplayCount(nextCount);
  };

  // ✅ Fetch once on mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const hasMore = products.length < allProducts.length;

  return (
    <div>
      <Header />

      {/* Cover Image */}
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/image/mencoverpage.jpg" // Add your men's cover image
              className="d-block w-100"
              alt="Men Collection Cover"
            />
          </div>
        </div>
      </div>

      {/* Men's Collection */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Men's Collection</h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {products.length === 0 && !loading && (
            <p className="text-muted text-center">No men's products found.</p>
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
                      : p.description || "Stylish men's accessory"}
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

        {/* Load More Button */}
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

        {/* No More Products */}
        {!hasMore && products.length > 0 && (
          <p className="text-center mt-3 text-muted">
            No more men's products to load.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Mens;
