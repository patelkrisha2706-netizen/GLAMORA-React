import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    const fetchCartWithProducts = async () => {
      if (!savedUser) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      try {
        //  Fetch user's cart items
        const cartRes = await axios.get(
          `http://localhost:3001/addtocart?uid=${savedUser.uid}`
        );
        const cartData = cartRes.data;

        const productsRes = await axios.get("http://localhost:3001/products");
        const products = productsRes.data;

        // Only keep the *most recent product*
        const lastItem = cartData[cartData.length - 1]; // last added
        const merged = lastItem
          ? [
              {
                ...lastItem,
                pname: products.find((p) => p.id === lastItem.id)?.pname || "Product",
                image: products.find((p) => p.id === lastItem.id)?.image || "",
                price: products.find((p) => p.id === lastItem.id)?.price || lastItem.price,
                totalPrice: lastItem.qty * (products.find((p) => p.id === lastItem.id)?.price || lastItem.price),
              },
            ]
          : [];

        setCartItems(merged);
      } catch (err) {
        console.error("Error fetching cart/products:", err);
      }
    };

    fetchCartWithProducts();
  }, [savedUser, navigate]);

  //  Update quantity
  const handleQtyChange = async (item, change) => {
    const newQty = item.qty + change;
    if (newQty < 1) return;

    const updatedItem = {
      ...item,
      qty: newQty,
      totalPrice: newQty * item.price,
    };

    try {
      await axios.put(`http://localhost:3001/addtocart/${item.id}`, updatedItem);
      setCartItems([updatedItem]); // keep only this item
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/addtocart/${id}`);
      setCartItems([]);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">🛒 My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.pname} style={{ width: "60px" }} />
                    </td>
                    <td>{item.pname}</td>
                    <td>₹ {item.price}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary me-2" onClick={() => handleQtyChange(item, -1)}>-</button>
                      {item.qty}
                      <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleQtyChange(item, 1)}>+</button>
                    </td>
                    <td>₹ {item.totalPrice}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
                <tr className="fw-bold">
                  <td colSpan="4" className="text-end">Grand Total</td>
                  <td colSpan="2">₹ {grandTotal}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-end mt-3">
              <button className="btn btn-primary" onClick={() => navigate("/checkout", { state: { cartItems } })}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddToCart;