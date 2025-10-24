import React from "react";
import Footer from "../components/footer";
import "./Discover.css";

const Discover = () => {
  return (
    <div className="discover-page">
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Discover the New Season</h1>
          <p>Men • Women • Kids — Autumn 2025</p>
          <button>Explore Collection</button>
        </div>
      </section>

      {/* --- CATEGORY SECTION --- */}
      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://static.pullandbear.net/assets/public/4d20/6cc7/96cf4664a9ea/767a5505dbe2/2_DESKTOP/2_DESKTOP.jpg?ts=1760367608129&w=1292.5&f=auto" alt="Homme" />
            <div className="overlay"><span>Men</span></div>
          </div>
          <div className="category-card">
            <img src="https://cdn.dashsocial.com/media/original/1761133899.748266585946.jpg" alt="Femme" />
            <div className="overlay"><span>Women</span></div>
          </div>
          <div className="category-card">
            <img src="https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI322702674082_alternate3?$rl_4x5_zoom$" alt="Kids" />
            <div className="overlay"><span>Kids</span></div>
          </div>
        </div>
      </section>

      {/* --- BEST SELLERS SECTION --- */}
      <section className="bestseller-section">
        <h2>Best Sellers</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://img.kwcdn.com/product/fancy/f29c1c13-17ba-481a-b794-dfd6a178e31d.jpg?imageView2/2/w/500/q/60/format/webp" alt="Boyfriend Jean" />
            <h3>Boyfriend Jean</h3>
            <p>59€</p>
            <button>Add to cart</button>
          </div>

          <div className="product-card">
            <img src="https://static.e-stradivarius.net/assets/public/9e40/a0e2/f2224720bd37/1c7b9a8475f0/19257570100-a1/19257570100-a1.jpg?ts=1739443578835" alt="Leather flat sandals" />
            <h3>SLeather flat sandals</h3>
            <p>49€</p>
            <button>Add to cart</button>
          </div>

          <div className="product-card">
            <img src="https://media.vertbaudet.com/Pictures/vertbaudet/724906/combishort-raye-bebe.jpg?width=457?width=1320" alt="Striped baby romper" />
            <h3>Striped baby romper</h3>
            <p>35€</p>
            <button>Add to cart</button>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="newsletter-section">
        <h2>Join Our Fashion Community</h2>
        <p>Sign up and get 10% off your first order  !</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Ur e-mail" />
          <button>Sign up </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discover;
