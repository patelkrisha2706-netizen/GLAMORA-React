import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [topStyles, setTopStyles] = useState([]);
  const [limit, setLimit] = useState(4); // initial limit is 4
  const [loading, setLoading] = useState(false);

  // Shuffle helper function
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Fetch all products once
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      const shuffled = shuffleArray(data);
      setAllProducts(shuffled);
      setTopStyles(shuffled.slice(0, limit)); // show first 4
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Load more products: 4 at a time
  const loadMoreProducts = () => {
    const nextProducts = allProducts.slice(0, topStyles.length + 4); // next 4
    setTopStyles(nextProducts);
    setLimit(limit + 4);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-images">
          <img src="/image/coverpage1.jpg" alt="Evil Eye Bracelet" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <h2 className="text-center mb-4">Shop by Categories</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {[
            { src: "/image/necklaces.jpg", alt: "Necklaces", label: "Necklaces", link: "/necklace" },
            { src: "/image/ring.jpg", alt: "Rings", label: "Rings", link: "/rings" },
            { src: "/image/earring.jpg", alt: "Earrings", label: "Earrings", link: "/earrings" },
            { src: "/image/bracelets.jpg", alt: "Bracelets", label: "Bracelets", link: "/bracelets" },
            { src: "/image/mens.jpg", alt: "Mens", label: "Mens", link: "/mens" },
          ].map(({ src, alt, label, link }) => (
            <Link to={link} key={label} className="text-decoration-none text-dark">
              <div
                className="card category-card"
                style={{ width: "12rem", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
              >
                <img src={src} className="card-img-top" alt={alt} style={{ height: "150px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <p className="card-text fw-bold">{label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Styles Section */}
      <section className="top-styles-section py-5">
        <h2 className="text-center mb-4">GLAMORA TOP STYLES</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {topStyles.length === 0 && !loading ? (
            <p>No products available.</p>
          ) : (
            topStyles.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="card text-decoration-none"
                style={{
                  width: "12rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={product.image.startsWith("/image") ? product.image : `/image/${product.image}`}
                  className="card-img-top"
                  alt={product.pname}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <p className="card-text fw-bold">{product.pname}</p>
                  <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {product.description?.slice(0, 60)}...
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Load More Button */}
        {topStyles.length < allProducts.length && (
          <div className="text-center mt-4">
            <button className="btn btn-outline-dark" onClick={loadMoreProducts}>
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Body;
