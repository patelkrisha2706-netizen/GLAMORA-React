import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";

function Header() {
  const [menuItems, setMenuItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Get logged-in user
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // Fetch menu
  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.log("Menu fetch error:", err));
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Products fetch error:", err));
  }, []);

  // Filter logic
  useEffect(() => {
    if (!searchTerm) {
      setFiltered([]);
      return;
    }

    const results = products.filter((item) =>
      item.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFiltered(results);
  }, [searchTerm, products]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm"
      style={{ padding: "10px 40px" }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src="/image/GLAMORA-removebg-preview.png"
            alt="GLAMORA Logo"
            style={{ height: "45px" }}
          />
        </Link>

        {/* Menu */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <Link className="nav-link text-dark" to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Box */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Jewellery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "200px" }}
          />

          {/* Search Results */}
          {filtered.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                background: "white",
                border: "1px solid #ccc",
                width: "200px",
                zIndex: 10,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filtered.map((item) => (
                <div key={item.id} style={{ padding: "5px 10px" }}>
                  <Link
                    to={`/product/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => setSearchTerm("")}
                  >
                    {item.pname}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons + Login/Logout */}
        <div className="d-flex align-items-center gap-3 ms-3">
          <Link to="/profile" className="text-dark">
            <FaUser />
          </Link>

          <Link to="/wishlist" className="text-dark">
            <FaHeart />
          </Link>

          <Link to="/addtocart" className="text-dark">
            <FaShoppingBag />
          </Link>

          {/*LOGIN / LOGOUT CONDITION */}
          {savedUser ? (
            <Link to="/logout" className="btn btn-link text-dark fw-semibold">
              Logout
            </Link>
          ) : (
            <Link to="/user-login" className="btn btn-link text-dark fw-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;