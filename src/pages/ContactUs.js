import React from "react";
import "./ContactUs.css"; // Add styles separately or use inline styles
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div>
      <Header />
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        Have questions about our products, your order, or partnership opportunities? We’d love to hear from you! Our team is always here to help.
      </p>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Message</label>
          <textarea placeholder="Type your message here..."></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>📍 Our Office</h3>
          <p>GLAMORA Jewelry Pvt. Ltd.<br />Ring Road, Surat, Gujarat, India – 395003</p>

          <h3>📞 Contact Info</h3>
          <p><strong>Email:</strong> support@glamora.com<br />
          <strong>Phone:</strong> +91 98765 43210<br />
          <strong>Working Hours:</strong> Mon – Sat, 10:00 AM – 7:00 PM</p>

          <h3>🌐 Follow Us</h3>
          <p>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> |{" "}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |{" "}
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
</div>
  );
};


export default ContactUs;
