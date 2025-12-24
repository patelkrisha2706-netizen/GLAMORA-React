import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h3>Please <Link to="/user-login">Login</Link> First to View Your Profile.</h3>
      </div>
    );
  }

  return (
    <div>
      <Header />
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h2 className="text-center">Welcome, {user.name} 👋</h2>
        <hr />
        <p><strong>Full Name:</strong> {user.uname}</p>
        <p><strong>Email:</strong> {user.uemail}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <hr />
        <h4 className="text-primary text-center">My Activity</h4>
        <ul className="list-group">
          <li className="list-group-item"><Link to="/wishlist">💖 Wishlisted Products</Link></li>
          <li className="list-group-item"><Link to="/addtocart">🛒 Add To Cart</Link></li>
          <li className="list-group-item"><Link to="/myorder">📦 My Order</Link></li>
          <li className="list-group-item">
            <button
              className="btn btn-link text-danger p-0"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload(); // or navigate to login
              }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
</div>
  );
};

export default UserProfile;
