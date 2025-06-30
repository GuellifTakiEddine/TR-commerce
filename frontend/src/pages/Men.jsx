import React from "react";
import Product from "../components/product";
import Footer from "../components/footer";

const Mens = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>

      <Footer />
    </>
  );
};

export default Mens;
