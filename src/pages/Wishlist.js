import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Get logged-in user safely
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  //  Fetch wishlist items
  useEffect(() => {
    if (!savedUser) {
      alert("Please login to view your wishlist");
      navigate("/user-login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:3001/wishlist", {
          params: { uid: savedUser.uid }
        });
        setWishlistItems(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [savedUser, navigate]);

  // Remove item from wishlist
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${id}`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  //  Add to cart and remove from wishlist
  const handleAddToCart = async (item) => {
    try {
      // 1️⃣ Add product to cart
      const cartItem = {
        acid: Date.now(),
        uid: savedUser.uid,
        uname:savedUser.uname,
        id: item.id,
        pname: item.pname,
        image: item.image, 
        qty: 1,
        image: item.image,
        price: item.price,
        totalPrice: item.price,
        time_date: new Date().toLocaleString(),
      };

      await axios.post("http://localhost:3001/addtocart", cartItem);

      // Remove it from wishlist
      await handleRemove(item.id);

      alert(`${item.pname} added to cart!`);
      navigate("/addtocart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart");
    }
  };

  if (!savedUser) return null;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center">
            Your wishlist is empty. <Link to="/">Shop now</Link>
          </p>
        ) : (
          <div className="row">
            {wishlistItems.map((item) => (
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.pname}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.pname}</h5>
                    <p className="card-text">₹{item.price}</p>

                    <button
                      className="btn btn-sm btn-dark me-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;