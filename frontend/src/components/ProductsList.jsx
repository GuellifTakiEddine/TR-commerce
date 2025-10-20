import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        console.log("📦 Backend returned:", JSON.stringify(res.data, null, 2));


        // ✅ Normalize IDs correctly from backend data
        const data = res.data.map((p, index) => {
          // Check all possible ID fields
          const realId =
            p._id || p.id || p.product_id || p.productId || `temp-${index}`;
          
          return {
            ...p,
            _id: realId, // ensure every product has an _id field
          };
        });

        console.log("🟣 Normalized products with _id:", data);
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-list">
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        products.map((product) => {
          console.log("🧩 Sending to <Product>:", product.title, "id=", product._id);
          return (
            <Product
              key={product._id}
              _id={product._id}
              title={product.name || product.title}
              brand={product.brand}
              price={product.price}
              colors={product.colors || 1}
              images={Array.isArray(product.photos) ? product.photos : [product.photos]}
            />
          );
        })
      )}
    </div>
  );
};

export default ProductsList;
