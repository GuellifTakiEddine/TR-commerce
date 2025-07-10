import React, { useState, useEffect } from "react";
import Product from "../components/product";
import Footer from "../components/footer";

const Mens = () => {
  const categories = ["All", "T-Shirts", "Shoes", "Pants", "Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter((p) => p.type === selectedCategory);

console.log("Categories in DB:", products.map(p => p.category));

console.log("Selected category:", selectedCategory);
console.log("Products:", products);
console.log("Filtered products:", filteredProducts);

  return (
    <>
      {/* Category buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "20px",
              border: selectedCategory === cat ? "2px solid #000" : "2px solid transparent",
              backgroundColor: selectedCategory === cat ? "#000" : "#f0f0f0",
              color: selectedCategory === cat ? "#fff" : "#333",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {loading ? (
          <div>Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div>No products found.</div>
        ) : (
          filteredProducts.map((prod, i) => (
            <Product
              key={prod._id || i}
              title={prod.name}
              brand={prod.brand}
              price={prod.price}
              colors={prod.colors}
              images={[prod.photos || prod["photos "] || "https://via.placeholder.com/300"]}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Mens;
