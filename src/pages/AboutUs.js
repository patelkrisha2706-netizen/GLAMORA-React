import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Header />

      {/* Hero Section with Single Color Background */}
      <div
        className="about-hero text-center py-5"
        style={{
          backgroundColor: "#e3ec5aff", // Replace with any color you like
          color: "white",
          borderRadius: "10px",
        }}
      >
        <h1
          className="display-4 fw-bold"
          style={{
            color: "white",
          }}
        >
          About Glamora
        </h1>
        <p
          className="lead mt-3"
          style={{
            color: "white",
            fontWeight: "500",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          Where elegance meets timeless beauty
        </p>
      </div>

      {/* About Content */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Story</h2>
        <p className="text-center text-muted">
          Glamora was founded with a passion for exquisite jewelry that celebrates
          individuality and elegance. Our mission is to craft timeless pieces that
          not only enhance beauty but also tell a story—your story.
        </p>

        <div className="row mt-5 align-items-center">
          <div className="col-md-6">
            <img
              src="/image/about.jpg"
              alt="Our Story"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold">Our Mission</h3>
            <p className="text-muted">
              At Glamora, we believe jewelry is more than an accessory. It is a
              reflection of personality, a symbol of cherished moments, and an
              expression of art. We strive to offer pieces that are ethically
              crafted, sustainably sourced, and meticulously designed.
            </p>

            <h3 className="fw-bold mt-4">Our Vision</h3>
            <p className="text-muted">
              To become a trusted destination for individuals seeking high-quality
              jewelry that balances luxury with modern elegance. We aim to
              continuously innovate, bringing unique designs that celebrate every
              wearer’s style.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section text-center mt-5">
          <h2 className="mb-4">Our Core Values</h2>
          <div className="row justify-content-center">
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Quality</h5>
              <p className="text-muted">
                We use only the finest materials and craftsmanship.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Elegance</h5>
              <p className="text-muted">
                Our designs are timeless, sophisticated, and unique.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Integrity</h5>
              <p className="text-muted">
                We maintain honesty, transparency, and ethical sourcing in all we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
