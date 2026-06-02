import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../components/Product";

const SearchPage = () => {
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category?.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>



      <p>{results.length} products found</p>

      {results.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px"
          }}
        >
          <h2>No products found </h2>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {results.map((prod) => (
            <Product
              key={prod._id}
              _id={prod._id}
              title={prod.name}
              brand={prod.brand}
              price={prod.price}
              colors={prod.colors}
              images={[
                prod.photos ||
                prod["photos "] ||
                "https://via.placeholder.com/300",
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;