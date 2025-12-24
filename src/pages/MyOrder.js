import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        //  Get logged-in user
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser?.uid) {
          alert("Please login first!");
          return;
        }

        //  Fetch orders of logged-in user only
        const orderRes = await axios.get("http://localhost:3001/order_t", {
          params: { uid: savedUser.uid },
        });
        const orderData = orderRes.data;

        //  Fetch products (for join)
        const productRes = await axios.get("http://localhost:3001/products");
        const products = productRes.data;

        //  Merge order with product info
        const merged = orderData.map((o) => {
          const product = products.find((p) => p.id === o.id); // match by product id
          return {
            ...o,
            pname: product?.pname || "Unknown Product",
            image: product?.image || "",
          };
        });

        //  Sort by latest (time_date desc)
        merged.sort((a, b) => new Date(b.time_date) - new Date(a.time_date));

        setOrders(merged);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center">
            You have no orders. <a href="/">Shop now</a>
          </p>
        ) : (
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light ">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.oid}>
                  <td>
                    {o.image ? (
                      <img
                        src={o.image}
                        alt={o.pname}
                        width="60"
                        style={{ borderRadius: "5px" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{o.pname}</td>
                  <td>{o.qty}</td>
                  <td>₹ {o.price}</td>
                  <td>
                    {o.ostatus?.toLowerCase() === "delivered" ? (
                      <span className="badge bg-success">Delivered</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                  </td>
                  <td>{o.time_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrder;
