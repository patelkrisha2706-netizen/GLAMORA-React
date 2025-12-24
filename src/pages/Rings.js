import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Rings = () => {
  const [allProducts, setAllProducts] = useState([]); // store all randomized products
  const [products, setProducts] = useState([]); // visible products
  const [offset, setOffset] = useState(0);
  const limit = 8;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const categoryId = 2; // Rings category

  // Fetch all products once and randomize
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/products?cid=${categoryId}`
      );
      if (res.data.length > 0) {
        // Shuffle products randomly
        const shuffled = res.data.sort(() => Math.random() - 0.5);
        setAllProducts(shuffled);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching ring products:", err);
    }
  };

  // Load products in batches without repetition
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

  // Fetch all products once on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Load first batch when all products are ready
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
              src="/image/ringcoverpage.jpg"
              className="d-block w-100"
              alt="Rings Cover"
            />
          </div>
        </div>
      </div>

      {/* Rings Collection */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Rings Collection</h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {products.length === 0 && !loading && (
            <p className="text-muted text-center">No ring products found.</p>
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
                      : p.description || "Beautifully crafted ring"}
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
            No more ring products to load.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Rings;
