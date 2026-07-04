import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Footer from "../components/footer";

const Wishlist = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe") === "true";

    const storedUser = remember
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setLoading(false);
    }
  }, []);

  // 🔹 Fetch wishlist products
  useEffect(() => {
    if (!user?._id) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/wishlist/${user._id}`
        );

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();

        console.log("Wishlist products:", data);

        setWishlist(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  return (
    <>
      {!user ? (
        <h2 style={{ textAlign: "center" }}>
          Please log in to see your wishlist ❤️
        </h2>
      ) : loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : wishlist.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          Your wishlist is empty 💔
        </h2>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          {wishlist.map((prod) => (
            <Product
  key={prod._id}
  {...prod}
  title={prod.name}
  images={[
    prod.photos ||
    prod["photos "] ||
    "https://via.placeholder.com/300",
  ]}
  onWishlistRemoved={() =>
    setWishlist(prev =>
      prev.filter(item => item._id !== prod._id)
    )
  }
/>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Wishlist;
