import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "./ProductDetails.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [limit, setLimit] = useState(4);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const savedUser = JSON.parse(localStorage.getItem("user"));

  // Fetch selected product
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  // Suggested products (same category)
  useEffect(() => {
    if (!product) return;

    axios
      .get(`http://localhost:3001/products?cid=${product.cid}&_limit=${limit}`)
      .then((res) => {
        const filtered = res.data.filter((p) => String(p.id) !== String(id));
        setSuggestedProducts(filtered);
      })
      .catch((err) => console.error("Error fetching suggested products:", err));
  }, [product, limit, id]);

  const handleLoadMore = () => setLimit((prev) => prev + 4);

  const requireLogin = () => {
    if (!savedUser) {
      alert("Please login first!");
      navigate("/user-login");
      return false;
    }
    return true;
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    if (product) {
      const cartItem = {
        acid: Date.now(),
        id: product.id,
        uid: savedUser.uid,
        uname: savedUser.uname,
        pname: product.pname,

        // ⭐ ADD IMAGE COLUMN HERE — IMPORTANT
        image: product.image,

        qty: 1,
        price: product.price,
        totalPrice: product.price,
        time_date: new Date().toLocaleString(),
      };

      try {
        await axios.post("http://localhost:3001/addtocart", cartItem);
        navigate("/addtocart");
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Failed to add product to cart.");
      }
    }
  };

  // ADD TO WISHLIST
  const handleWishlist = async () => {
    if (!requireLogin()) return;

    if (product) {
      const wishlistItem = {
        wid: Date.now(),
        id: product.id,
        uid: savedUser.uid,
        uname: savedUser.uname,
        pname: product.pname,
        price: product.price,

        // wishlist already has image
        image: product.image,

        time_date: new Date().toLocaleString(),
      };

      try {
        await axios.post("http://localhost:3001/wishlist", wishlistItem);
        navigate("/wishlist");
      } catch (err) {
        console.error("Error adding to wishlist:", err);
        alert("Failed to add product to wishlist.");
      }
    }
  };

  // FEEDBACK SUBMIT
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!requireLogin()) return;

    if (!feedbackMessage.trim()) {
      alert("Please enter your feedback!");
      return;
    }

    try {
      const feedbackData = {
        id: Date.now().toString(),
        username: savedUser.uname,
        message: feedbackMessage,
        created_at: new Date().toLocaleString(),
      };

      await axios.post("http://localhost:3001/feedback", feedbackData);
      setFeedbackSubmitted(true);
      setFeedbackMessage("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback");
    }
  };

  if (!product)
    return <p className="text-center mt-5">Loading product...</p>;

  return (
    <div>
      <Header />
      <div className="container mt-5">

        {/* Product Info */}
        <div className="row mb-5">
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.pname}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <h2>{product.pname}</h2>
            <p className="text-muted">{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>

            <div className="d-flex gap-3 mt-3">
              <button className="btn btn-outline-dark" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
              <button className="btn btn-outline-danger" onClick={handleWishlist}>
                <FaHeart className="me-2" /> Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <hr className="my-5" />
        <h3 className="text-center mb-4">Give Your Feedback</h3>

        <div className="row justify-content-center">
          <div className="col-md-6">
            {feedbackSubmitted && (
              <div className="alert alert-success">
                Feedback submitted successfully!
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-3">
                <label>Feedback</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Products */}
        <hr className="my-5" />
        <h3 className="text-center mb-4">Complete Your Look</h3>

        <div className="row">
          {suggestedProducts.map((prod) => (
            <div className="col-12 col-sm-6 col-md-3 mb-4" key={prod.id}>
              <Link
                to={`/product/${prod.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card product-card position-relative">
                  <img
                    src={prod.image}
                    className="card-img-top product-img"
                    alt={prod.pname}
                  />
                  <div className="card-body text-center px-2">
                    <p className="fw-bold mb-1">{prod.pname}</p>
                    <p className="fw-bold">₹{prod.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button onClick={handleLoadMore} className="btn btn-outline-dark">
            Load More
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;