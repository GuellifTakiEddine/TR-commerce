import React, { useState } from "react";
import Product from "../components/product";
import Footer from "../components/footer";

const mensProducts = [
  {
    id: 1,
    category: "T-Shirts",
    title: "Basic Tee",
    price: "29.99",
    colors: 2,
    images: ["/images/mens-tshirt1.jpg"],
  },
  {
    id: 2,
    category: "Shoes",
    title: "Running Shoes",
    price: "89.99",
    colors: 4,
    images: ["/images/mens-shoes1.jpg"],
  },
  {
    id: 3,
    category: "Pants",
    title: "Slim Fit Jeans",
    price: "69.99",
    colors: 3,
    images: ["/images/mens-jeans1.jpg"],
  },
  {
    id: 4,
    category: "Accessoires",
    title: "Leather Belt",
    price: "49.99",
    colors: 1,
    images: ["/images/mens-belt1.jpg"],
  },
  {
    id: 5,
    category: "T-Shirts",
    title: "Printed Shirt",
    price: "39.99",
    colors: 5,
    images: ["/images/mens-shirt1.jpg"],
  },
  {
    id: 6,
    category: "Shoes",
    title: "Casual Sneakers",
    price: "74.99",
    colors: 2,
    images: ["/images/mens-sneakers1.jpg"],
  },
];

const Mens = () => {
  const categories = ["All", "T-Shirts", "Shoes", "Pants", "Accessoires"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? mensProducts
      : mensProducts.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Catégories */}
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
              border:
                selectedCategory === cat
                  ? "2px solid #000"
                  : "2px solid transparent",
              backgroundColor:
                selectedCategory === cat ? "#000" : "#f0f0f0",
              color: selectedCategory === cat ? "#fff" : "#333",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Produits filtrés */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {filteredProducts.map((prod) => (
          <Product
            key={prod.id}
            id={prod.id}
            title={prod.title}
            brand={prod.brand}
            price={prod.price}
            colors={prod.colors}
            images={prod.images}
          />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Mens;
