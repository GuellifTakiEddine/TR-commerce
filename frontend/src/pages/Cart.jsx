import React, { useState } from "react";
import Footer from "../components/footer";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Leather flat sandals",
      price: 7800,
      quantity: 1,
      image:
        "https://static.e-stradivarius.net/assets/public/9e40/a0e2/f2224720bd37/1c7b9a8475f0/19257570100-a1/19257570100-a1.jpg?ts=1739443578835",
      color: "Beige",
      size: "37",
    },
    {
      id: 2,
      name: "Ralph Lauren Polo",
      price: 5700,
      quantity: 2,
      image:
        "https://www.trunc.ph/media/iopt/catalog/product/cache/890b1ae4f7b88a8a811f35bacf82bb7c/p/o/polo-20382298_1.webp",
      color: "White",
      size: "M",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [shipping, setShipping] = useState(0);

  const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
    "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
    "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
    "Constantine", "Médéa", "Mostaganem", "MSila", "Mascara", "Ouargla", "Oran", "El Bayadh",
    "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
    "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane", "El M'Ghair", "El Menia", "Ouled Djellal", "Bordj Badji Mokhtar",
    "Béni Abbès", "Timimoun", "Touggourt", "Djanet", "In Salah", "In Guezzam",
  ];

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "zahry") {
      setDiscount(1000);
      alert("🎉 Promo code applied! You saved 1000 DA!");
    } else {
      setDiscount(0);
      alert("❌ Invalid promo code");
    }
  };

  const handleWilayaChange = (e) => {
    const wilaya = e.target.value;
    setSelectedWilaya(wilaya);

    if (wilaya === "Alger") setShipping(400);
    else if (
      ["Blida", "Tipaza", "Boumerdès", "Tizi Ouzou", "Annaba", "El Tarf","Oum El Bouaghi"].includes(wilaya)
    )
      setShipping(600);
    else setShipping(900);
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        <h1 className="cart-title">My Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-line">
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-subinfo">
                    Taille {item.size} | {item.color}
                  </p>
                  <p className="item-price">{item.price.toLocaleString()} DZD</p>

                  <div className="item-quantity">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                </div>

                <div className="cart-item-icons">
                  <span className="icon-heart">♥</span>
                  <span
                    className="icon-trash"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: <strong>{subtotal.toLocaleString()} DA</strong></p>
            <p>Shipping: <strong>{shipping.toLocaleString()} DA</strong></p>
            {discount > 0 && (
              <p className="discount">Discount: -{discount.toLocaleString()} DA</p>
            )}

            <div className="wilaya-section">
              <h4>Delivery Wilaya</h4>
              <select
                value={selectedWilaya}
                onChange={handleWilayaChange}
                className="wilaya-select"
              >
                <option value=""> Select your Wilaya </option>
                {wilayas.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>

            <div className="promo-section">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromo}>Apply</button>
            </div>

            <hr />
            <p className="total">
              Total: <strong>{total.toLocaleString()} DA</strong>
            </p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
