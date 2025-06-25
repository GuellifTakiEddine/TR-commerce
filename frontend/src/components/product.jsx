import React, { useState } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";

const Product = () => {
  const [isWished, setIsWished] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://via.placeholder.com/220x180?text=Image+1",
    "https://via.placeholder.com/220x180?text=Image+2",
    "https://via.placeholder.com/220x180?text=Image+3"
  ];

  const toggleWishlist = () => {
    setIsWished(!isWished);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="product">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={images[currentImageIndex]}
          alt="Product"
        />
        <img
          className="fav-icon"
          src={isWished ? wishIconFilled : wishIcon}
          alt="Wishlist"
          onClick={toggleWishlist}
        />
        <button className="image-arrow left" onClick={prevImage}>
          &lt;
        </button>
        <button className="image-arrow right" onClick={nextImage}>
          &gt;
        </button>
      </div>

      <div className="product-title">Cool Sneakers</div>
      <div className="product-brand">Brand X</div>
      <div className="product-price">$49.99</div>
      <div className="product-colors">Available in 3 colors</div>
    </div>
  );
};

export default Product;
