import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">

      {/* HERO */}
      <div className="about-hero">
        <h1>ABOUT US</h1>

      </div>

      {/* CONTENT */}
      <div className="about-content">

        <section className="about-section">
          <h2>OUR STORY</h2>
          <p>
            Founded in 2025, TR-commerce was created to bring a clean and
            modern shopping experience inspired by global fashion brands.
          </p>
        </section>

        <section className="about-section">
          <h2>OUR MISSION</h2>
          <p>
            We aim to deliver high-quality fashion products with a seamless
            online shopping experience for everyone.
          </p>
        </section>

        <section className="about-section">
          <h2>WHY US</h2>
          <p>
            Minimal design, fast browsing, secure checkout, and a curated
            selection of fashion items designed for modern lifestyles.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;