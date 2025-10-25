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
  const [favorites, setFavorites] = useState([]);

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

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
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
        <h1 className="cart-title">SHOPPING BAG</h1>

        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-header">
              <span className="header-product">PRODUCT</span>
              <span className="header-quantity">QUANTITY</span>
              <span className="header-total">TOTAL</span>
            </div>
            
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-modern">
                  <div className="item-main-info">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-attributes">
                        Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong>
                      </p>
                      <p className="item-unit-price">{item.price.toLocaleString()} DA</p>
                    </div>
                  </div>

                  <div className="item-quantity-section">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total-section">
                    <span className="item-total-price">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </span>
                    <div className="action-buttons">
                      <button 
                        className={`action-btn favorite-btn ${favorites.includes(item.id) ? 'favorited' : ''}`}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={favorites.includes(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-modern">
            <h2 className="summary-title">ORDER SUMMARY</h2>
            
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()} DA</span>
            </div>
            
            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping.toLocaleString()} DA</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-line discount-line">
                <span>Discount</span>
                <span>-{discount.toLocaleString()} DA</span>
              </div>
            )}

            <div className="wilaya-section-modern">
              <label>DELIVERY WILAYA</label>
              <select
                value={selectedWilaya}
                onChange={handleWilayaChange}
                className="wilaya-select-modern"
              >
                <option value="">Select your Wilaya</option>
                {wilayas.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>

            <div className="promo-section-modern">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button onClick={applyPromo} className="promo-apply-btn">APPLY</button>
            </div>

            <div className="summary-total">
              <span>TOTAL</span>
              <span>{total.toLocaleString()} DA</span>
            </div>
            
            <button className="checkout-btn-modern">PROCEED TO CHECKOUT</button>
            
            <div className="secure-payment">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;