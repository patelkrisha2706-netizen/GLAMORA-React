import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state; 

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [user] = useState(savedUser || {});
  const [address, setAddress] = useState(savedUser?.address || "");
  const [phone, setPhone] = useState(savedUser?.phone || "");

  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleConfirmOrder = async () => {
    try {
      const orders = cartItems.map((item, index) => ({
        oid: Date.now() + index,
        id: item.id,
        cid: item.cid || index + 1,
        uid: user.uid,
        time_date: new Date().toLocaleString(),
        price: item.totalPrice,
        address,
        phone,
        qty: item.qty,
        ostatus: "pending",
        pname: item.pname,  
        image: item.image,   
      }));

      for (let order of orders) {
        await axios.post("http://localhost:3001/order_t", order);
      }

      alert("Order placed successfully!");
      navigate("/myorder");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">Checkout</h2>

        {/* Cart Summary */}
        <h4>Order Summary</h4>
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.pname}</td>
                <td>{item.qty}</td>
                <td>₹ {item.price}</td>
                <td>₹ {item.totalPrice}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan="3" className="text-end">Grand Total</td>
              <td>₹ {grandTotal}</td>
            </tr>
          </tbody>
        </table>

        {/* User Details */}
        <h4>User Details</h4>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" value={user.uname || ""} readOnly />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="text-end">
          <button className="btn btn-success" onClick={handleConfirmOrder}>
            Confirm & Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
