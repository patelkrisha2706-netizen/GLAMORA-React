import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">GLAMORA</h5>
            <p>Elegant Jewelry crafted for your moments.</p>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>Delivery Info</li>
              <li>Track Order</li>
              <li>Store Locator</li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>Blog</li>
              <li>Offers</li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p>Email: support@glamora.com</p>
            <p>Phone: +91 9876543210</p>
            <div className="d-flex gap-3">
              <i className="fab fa-instagram fa-lg"></i>
              <i className="fab fa-facebook fa-lg"></i>
              <i className="fab fa-youtube fa-lg"></i>
            </div>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0">© 2025 GLAMORA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
