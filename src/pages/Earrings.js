import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Earrings = () => {
  const [allProducts, setAllProducts] = useState([]); // all earring products (shuffled once)
  const [products, setProducts] = useState([]); // displayed products
  const [offset, setOffset] = useState(0);
  const limit = 8; // number of products per load
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const categoryId = 3; // Earrings

  // Fetch all products once and shuffle them
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/products?cid=${categoryId}`
      );
      if (res.data.length > 0) {
        // Randomize order
        const shuffled = res.data.sort(() => Math.random() - 0.5);
        setAllProducts(shuffled);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching earring products:", err);
    }
  };

  // Load products in small chunks without repeating
  const loadMoreProducts = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextBatch = allProducts.slice(offset, offset + limit);

    if (nextBatch.length > 0) {
      setProducts((prev) => [...prev, ...nextBatch]);
      setOffset((prev) => prev + nextBatch.length);

      if (offset + limit >= allProducts.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  // Fetch all once on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Once fetched, show first batch
  useEffect(() => {
    if (allProducts.length > 0) {
      loadMoreProducts();
    }
    // eslint-disable-next-line
  }, [allProducts]);

  return (
    <div>
      <Header />

      {/* Cover Image */}
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/image/earringcoverpage.jpg"
              className="d-block w-100"
              alt="Earrings Cover"
            />
          </div>
        </div>
      </div>

      {/* Earrings Collection */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Earrings Collection</h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {products.length === 0 && !loading && (
            <p className="text-muted text-center">No earring products found.</p>
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
                      : p.description || "Beautifully crafted earrings"}
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
            No more earring products to load.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Earrings;
