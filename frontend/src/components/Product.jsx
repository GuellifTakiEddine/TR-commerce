import React, { useState, useEffect } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";

const Product = ({ _id, title, brand, price, colors, images }) => {
  const [isWished, setIsWished] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  // 🔹 Load user
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Wishlist check
  useEffect(() => {
    if (!user?._id || !_id) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}`
        );
        const data = await res.json();

        const exists = data.some((p) => p._id === _id);
        setIsWished(exists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [user, _id]);

  // ❤️ WISHLIST TOGGLE
  const toggleWishlist = async () => {
    if (!user?._id) return alert("Login first");

    if (isWished) {
      await fetch(
        `http://localhost:5000/wishlist/${user._id}/${_id}`,
        { method: "DELETE" }
      );
      setIsWished(false);
    } else {
      await fetch("http://localhost:5000/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: _id,
        }),
      });
      setIsWished(true);
    }
  };

const addToCart = async () => {
  if (!user?._id) {
    alert("Please login first");
    return;
  }

  if (!_id) {
    alert("Product missing");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        productId: _id,
        quantity: 1,
        size: "M",
        color: "default",
      }),
    });

    const data = await res.json();

    console.log("CART RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data.error || "Cart failed");
    }

    alert("Added to cart 🛒");
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    alert("Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className="product">

      {/* IMAGE */}
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={images?.[0] || "https://via.placeholder.com/300"}
          alt={title}
        />

        {/* WISHLIST */}
        <img
          className="fav-icon"
          src={isWished ? wishIconFilled : wishIcon}
          alt="wishlist"
          onClick={toggleWishlist}
        />
      </div>

      {/* INFO */}
      <div className="product-title">{title}</div>
      <div className="product-brand">{brand}</div>
      <div className="product-price">${price}</div>
      <div className="product-colors">
        {colors || 0} colors available
      </div>

      {/* 🛒 ADD TO CART BUTTON */}
      <button
        className="add-to-cart-btn"
        onClick={addToCart}
        disabled={loadingCart}
      >
        {loadingCart ? "ADDING..." : "ADD TO CART"}
      </button>

    </div>
    
  );
};


export default Product;