import React, { useState } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";

const Product = ({ title, brand, price, colors, images }) => {
  const [isWished, setIsWished] = useState(false);

  const toggleWishlist = () => {
    setIsWished(!isWished);
  };

  return (
    <div className="product">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={images[0]}
          alt={title}
        />
        <img
          className="fav-icon"
          src={isWished ? wishIconFilled : wishIcon}
          alt="Wishlist"
          onClick={toggleWishlist}
        />
      </div>
      <div className="product-title">{title}</div>
      <div className="product-brand">{brand}</div>
      <div className="product-price">${price}</div>
      <div className="product-colors">{colors} colors available</div>
    </div>
  );
};

export default Product;
