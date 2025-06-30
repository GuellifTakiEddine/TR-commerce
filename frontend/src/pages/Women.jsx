import React, { useState } from "react";
import Product from "../components/product";
import Footer from "../components/footer";

const productsData = [
  { 
    id: 1, 
    category: "Tops", 
    title: "Bodies",
    price: "25.99",
    colors: 3,
    images: ["/images/bodies.jpg"] 
  },
  { 
    id: 2, 
    category: "Chaussures", 
    title: "Running Shoes",
    price: "79.99",
    colors: 4,
    images: ["/images/womens-running-shoes.jpg"] // ajoute une image ou laisse vide
  },
  { 
    id: 3, 
    category: "Pants", 
    title: "Jeans Slim",
    price: "59.99",
    colors: 2,
    images: ["/images/womens-jeans.jpg"]
  },
  { 
    id: 4, 
    category: "Accessories", 
    title: "Stylish Hat",
    price: "39.99",
    colors: 1,
    images: ["/images/womens-hat.jpg"]
  },
  { 
    id: 5, 
    category: "Tops", 
    title: "Summer Blouse",
    price: "29.99",
    colors: 3,
    images: ["/images/womens-blouse.jpg"]
  },
  { 
    id: 6, 
    category: "Chaussures", 
    title: "Leather Boots",
    price: "99.99",
    colors: 2,
    images: ["/images/womens-boots.jpg"]
  },
];

const Womens = () => {
  const categories = ["All", "Tops", "Chaussures", "Pants", "Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Boutons catégories */}
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

export default Womens;
