import React, { useState, useEffect } from "react";
import wishIcon from "./images/wishlist.svg";
import wishIconFilled from "./images/wishlist-filled.svg";
import "./product.css";

const Product = (props) => {
  // 🧩 DEBUG LOG — this helps us see what data actually arrives from ProductsList
  console.log("🧱 Product render:", props.title, "id=", props._id);

  // Destructure props
  const { _id, title, brand, price, colors, images } = props;

  // State for wishlist and user
  const [isWished, setIsWished] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Load the logged-in user (from localStorage or sessionStorage)
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Fetch wishlist to check if this product is already saved
  useEffect(() => {
    if (!user?._id || !_id) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/wishlist/${user._id}`);
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        const wished = data.some((p) => p._id === _id);
        setIsWished(wished);
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user, _id]);

  // ✅ Handle add/remove wishlist action
  const toggleWishlist = async () => {
    console.log("👉 toggleWishlist() called for ID:", _id);

    if (!user?._id) {
      alert("Please log in to add items to your wishlist ❤️");
      return;
    }

    if (!_id) {
      console.error("❌ Product ID missing in toggleWishlist!", props);
      return;
    }

    try {
      if (isWished) {
        // Remove from wishlist
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}/${_id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to remove from wishlist");
        setIsWished(false);
      } else {
        // Add to wishlist
        const res = await fetch("http://localhost:5000/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            productId: _id,
          }),
        });
        if (!res.ok) throw new Error("Failed to add to wishlist");
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
          src={images?.[0]}
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
      <div className="product-title">{title || "No title"}</div>
      <div className="product-brand">{brand || "Unknown brand"}</div>
      <div className="product-price">${price || "N/A"}</div>
      <div className="product-colors">{colors || 0} colors available</div>
    </div>
  );
};

export default Product;
  
