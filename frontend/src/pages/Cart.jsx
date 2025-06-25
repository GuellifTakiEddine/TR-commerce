import React, { useState } from "react";
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Djean pant", price: 7800, quantity: 1 },
    { id: 2, name: "Robe", price: 9800, quantity: 2 },
  ]);

  const [orderData, setOrderData] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "card",
  });

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 9) return;
      setOrderData((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullPhone = `+213${orderData.phone}`;
    const pattern = /^\+213[5-7][0-9]{8}$/;

    if (!pattern.test(fullPhone)) {
      setPhoneError("The number must start with 5, 6 or 7 and contain 9 digits.");
      return;
    }

    setPhoneError("");
    console.log("Commande validée :", { ...orderData, phone: fullPhone, cartItems });
    alert("Thank you!");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>My Shopping Bag</h2>

      <div className="cart-content">
        {/* Articles */}
        <div className="cart-items">
          <h3>Items</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.quantity} × {item.price.toFixed(2)} DA</span>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="cart-form">
          <h3>Delivery Details</h3>
          <input
            type="text"
            name="fullName"
            value={orderData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <h3>Phone Number</h3>
          <div className="phone-group">
            <span className="phone-prefix">+213</span>
            <input
              type="tel"
              name="phone"
              value={orderData.phone}
              onChange={handleChange}
              placeholder="XXXXXXXXX"
              required
            />
          </div>
          {phoneError && <p className="error">{phoneError}</p>}

          <h3>Payment Method</h3>
          <select
            name="paymentMethod"
            value={orderData.paymentMethod}
            onChange={handleChange}
          >
            <option value="card">Bank Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Payment on delivery</option>
          </select>

          <div className="order-summary">
            <h3>Total: {total.toFixed(2)} DA</h3>
            <button type="submit" className="btn-confirm">Submit the order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
