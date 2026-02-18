import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../components/Product";

const SearchPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:5000/products`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product =>
          product.brand.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      });
  }, [query]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Search results for: "{query}"</h2>

      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        results.map(prod => (
          results.map(prod => (
<Product
  key={prod._id}
  _id={prod._id}  
  title={prod.name}
  brand={prod.brand}
  price={prod.price}
  colors={prod.colors}
  images={[
    prod.photos || prod["photos "] || "https://via.placeholder.com/300",
  ]}
/>
))

        ))
      )}
    </div>
  );
};

export default SearchPage;
