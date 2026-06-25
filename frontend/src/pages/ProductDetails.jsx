import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/${id}`
        );

        const data = await res.json();

        if (typeof data.photos === "string") {
  try {
    data.photos = JSON.parse(data.photos);
  } catch {
    data.photos = [data.photos];
  }
}

if (typeof data.sizes === "string") {
  try {
    data.sizes = JSON.parse(data.sizes);
  } catch {
    data.sizes = [];
  }
}

if (!Array.isArray(data.sizes)) {
  data.sizes = [];
}

        setProduct(data);
        setSelectedImage(data.photos?.[0]);

        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0].size);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="pd-loading">
        Loading Product...
      </div>
    );
  }

  const sizes = Array.isArray(product.sizes)
  ? product.sizes
  : [];

const currentSize = sizes.find(
  (s) => String(s.size) === String(selectedSize)
);

  const stock =
    product.type === "Accessories"
      ? Number(product.quantity || 0)
      : Number(currentSize?.quantity || 0);

      console.log("PRODUCT =", product);
console.log("SIZES =", product.sizes);
console.log("PARSED SIZES =", sizes);
  return (
    <div className="pd-container">

      {/* LEFT SIDE */}
      <div className="pd-gallery">

        <div className="pd-thumbnails">
          {product.photos?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className={
                selectedImage === img
                  ? "pd-thumb active"
                  : "pd-thumb"
              }
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="pd-main-image">
          <img
            src={selectedImage}
            alt={product.name}
          />
        </div>

      </div>

      {/* RIGHT SIDE */}
<div className="pd-info">

  <p className="pd-brand">
    {product.brand}
  </p>

  <h1 className="pd-title">
    {product.name}
  </h1>

  <div className="pd-price">
    {product.price} DA
  </div>

  <p className="pd-description">
    {product.Description}
  </p>

  {/* STOCK */}

  <div className="pd-stock">
    {stock === 0 ? (
      <span className="out-stock">
        Out of Stock
      </span>
    ) : stock <= 5 ? (
      <span className="low-stock">
        Only {stock} left
      </span>
    ) : (
      <span className="in-stock">
        In Stock ({stock})
      </span>
    )}
  </div>

  {/* SIZE + QUANTITY */}

  {product.type !== "Accessories" && (
    <div className="size-row">

      {(product.type === "T-Shirts" ||
        product.type === "Shoes" || product.type === "Tops" || product.type === "Pants & Dresses") && (
        <div className="size-buttons">

          {sizes.map((s) => (
            <button
              key={s.size}
              className={
                selectedSize === s.size
                  ? "size-btn active"
                  : "size-btn"
              }
              onClick={() =>
                setSelectedSize(s.size)
              }
            >
              {s.size}
            </button>
          ))}

        </div>
      )}

      {product.type === "Pants" && (
        <select
          className="size-select"
          value={selectedSize}
          onChange={(e) =>
            setSelectedSize(e.target.value)
          }
        >
          {sizes.map((s) => (
            <option
              key={s.size}
              value={s.size}
            >
              Size {s.size}
            </option>
          ))}
        </select>
      )}

      <div className={
    product.type === "Pants"
      ? "pd-quantity pants-quantity"
      : "pd-quantity shirts-quantity"
  }>
        <button
          onClick={() =>
            setQuantity(
              Math.max(1, quantity - 1)
            )
          }
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
        >
          +
        </button>
      </div>

    </div>
  )}

  {/* ACCESSORIES ONLY */}

  {product.type === "Accessories" && (
    <div className="pd-quantity accessories-quantity">
      <button
        onClick={() =>
          setQuantity(
            Math.max(1, quantity - 1)
          )
        }
      >
        −
      </button>

      <span>{quantity}</span>

      <button
        onClick={() =>
          setQuantity(quantity + 1)
        }
      >
        +
      </button>
    </div>
  )}

  <button className="pd-cart-btn">
    Add To Cart
  </button>

  <button className="pd-buy-btn">
    Buy Now
  </button>

</div>
</div>
  );
};

export default ProductDetails;