import React, { useState, useEffect } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";
import { useNavigate } from "react-router-dom";

const Product = ({
  _id,
  title,
  brand,
  price,
  colors,
  images,
  onWishlistRemoved,
}) => {
  const [isWished, setIsWished] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${_id}`);
  };

  // FIX IMAGES
  let imageUrl = "https://via.placeholder.com/300";

  try {
    let fixedImages = images;

    if (typeof fixedImages === "string") {
      fixedImages = JSON.parse(fixedImages);
    }

    if (
      Array.isArray(fixedImages) &&
      typeof fixedImages[0] === "string" &&
      fixedImages[0].startsWith("[")
    ) {
      fixedImages = JSON.parse(fixedImages[0]);
    }

    if (Array.isArray(fixedImages) && fixedImages.length > 0) {
      imageUrl = fixedImages[0];
    }
  } catch (err) {
    console.error("Image parse error:", err);
  }

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user?._id || !_id) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}`
        );

        const data = await res.json();

        const exists = data.some(
          (p) => p._id === _id
        );

        setIsWished(exists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [user, _id]);

  const toggleWishlist = async (e) => {
  e.stopPropagation();

  if (!user?._id) {
    alert("Login first");
    return;
  }

  try {
    if (isWished) {
      const res = await fetch(
        `http://localhost:5000/wishlist/${user._id}/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setIsWished(false);

      // Remove immediately from Wishlist page
      if (onWishlistRemoved) {
        onWishlistRemoved();
      }

    } else {
      const res = await fetch(
        "http://localhost:5000/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            productId: _id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Add failed");
      }

      setIsWished(true);
    }
  } catch (err) {
    console.error(err);
  }
};

  const addToCart = (e) => {
  e.stopPropagation();

  navigate(`/product/${_id}`);
};
  return (
    <div
      className="product"
      onClick={goToDetails}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300";
          }}
        />

        <img
          className="fav-icon"
          src={
            isWished
              ? wishIconFilled
              : wishIcon
          }
          alt="wishlist"
          onClick={toggleWishlist}
        />
      </div>

      <div className="product-title">
        {title}
      </div>

      <div className="product-brand">
        {brand}
      </div>

      <div className="product-price">
        {price || 0} DA
      </div>

      <div className="product-colors">
        {colors || 0} colors available
      </div>

      <button
        className="add-to-cart-btn"
        onClick={addToCart}
        disabled={loadingCart}
      >
        {loadingCart
          ? "ADDING..."
          : "ADD TO CART"}
      </button>
    </div>
  );
};

export default Product;