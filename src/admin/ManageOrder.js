import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        axios.get("http://localhost:3001/order_t"),
        axios.get("http://localhost:3001/user"),
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Merge user details into each order
  const mergedOrders = orders.map((order) => {
    const user = users.find((u) => String(u.uid) === String(order.uid));
    return {
      ...order,
      uname: user?.uname || "Unknown User",
    };
  });

  // Update order status
  const handleStatusChange = async (order, newStatus) => {
    if (order.ostatus === "delivered") return; // Prevent changing delivered orders

    try {
      await axios.put(`http://localhost:3001/order_t/${order.id}`, {
        ...order,
        ostatus: newStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:3001/order_t/${id}`);
        fetchData();
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Orders</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#131212ff", color: "#fff" }}>
            <th>Order ID</th>
            <th>Product</th>
            <th>Image</th>
            <th>Customer</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mergedOrders.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          ) : (
            mergedOrders.map((order) => (
              <tr key={order.id} style={{ textAlign: "center" }}>
                <td>{order.oid}</td>
                <td>{order.pname}</td>
                <td>
                  {order.image ? (
                    <img
                      src={order.image}
                      alt={order.pname}
                      width="60"
                      style={{ borderRadius: "5px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{order.uname}</td>
                <td>{order.qty}</td>
                <td>₹ {order.price}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                  <select
                    value={order.ostatus}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    disabled={order.ostatus === "delivered"} // Disable if delivered
                    style={{ padding: "5px", borderRadius: 4 }}
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>{order.time_date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order.id)}
                    style={{
                      backgroundColor: "#a94442",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrders;
