import React, { useState, useEffect } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";

const Product = ({
  _id,
  title,
  brand,
  price,
  colors,
  images,
}) => {
  console.log("🧱 Product render:", title, "ID =", _id);

  const [isWished, setIsWished] = useState(false);
  const [user, setUser] = useState(null);

  // 🔹 Load logged-in user
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Check if product is already in wishlist
  useEffect(() => {
    if (!user?._id || !_id) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}`
        );

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();

        const wished = data.some(
          (product) => product._id === _id
        );

        setIsWished(wished);
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user, _id]);

  // 🔹 Toggle wishlist
  const toggleWishlist = async () => {
    console.log("👉 toggleWishlist() called for ID:", _id);

    if (!user?._id) {
      alert("Please log in to add items to your wishlist ❤️");
      return;
    }

    if (!_id) {
      console.error("❌ Product ID missing!", { title, _id });
      return;
    }

    try {
      if (isWished) {
        // Remove
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}/${_id}`,
          { method: "DELETE" }
        );

        if (!res.ok) throw new Error("Remove failed");

        setIsWished(false);
      } else {
        // Add
        const res = await fetch(
          "http://localhost:5000/wishlist",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user._id,
              productId: _id,
            }),
          }
        );

        if (!res.ok) throw new Error("Add failed");

        setIsWished(true);
      }
    } catch (err) {
      console.error("❌ Wishlist error:", err);
    }
  };

  return (
    <div className="product">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={images?.[0] || "https://via.placeholder.com/300"}
          alt={title || "Product"}
        />

        <img
          className="fav-icon"
          src={isWished ? wishIconFilled : wishIcon}
          alt="Wishlist"
          onClick={toggleWishlist}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="product-title">
        {title || "No title"}
      </div>

      <div className="product-brand">
        {brand || "Unknown brand"}
      </div>

      <div className="product-price">
        ${price ?? "N/A"}
      </div>

      <div className="product-colors">
        {colors ?? 0} colors available
      </div>
    </div>
  );
};

export default Product;
