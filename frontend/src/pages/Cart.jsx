import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import "./Cart.css";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  const user = JSON.parse(
    localStorage.getItem("user") ||
      sessionStorage.getItem("user")
  );
  const navigate = useNavigate();

  // =========================================
  // FETCH CART
  // =========================================
  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser?._id) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/cart/${storedUser._id}`
        );

        const data = await res.json();

        setCartItems(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // =========================================
  // REMOVE
  // =========================================
  const handleRemoveItem = async (id) => {
  await fetch(`http://localhost:5000/cart/${id}`, {
    method: "DELETE",
  });

  setCartItems((prev) =>
    prev.filter((item) => item._id !== id)
  );

  // Update Navbar counter
  window.dispatchEvent(new Event("cartUpdated"));
};

  // =========================================
const handleCheckout = async () => {
  if (!user?._id) {
    alert("Please login first");
    return;
  }

  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        items: cartItems,
        totalPrice: total,
      }),
    });

    const data = await res.json();

    console.log("ORDER CREATED:", data);

    if (data.orderId) {
      navigate(`/order/${data.orderId}`);
    }

  } catch (err) {
    console.log(err);
    alert("Checkout failed");
  }
};


  // UPDATE QTY
  // =========================================
const updateQuantity = async (item, newQty) => {
  if (newQty < 1) return;

  try {
    const res = await fetch(
      `http://localhost:5000/cart/${item._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: newQty,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update quantity");
    }

    setCartItems((prev) =>
      prev.map((i) =>
        i._id === item._id
          ? { ...i, quantity: newQty }
          : i
      )
    );

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error(err);
  }
};

  // =========================================
  // CALCULATIONS
  // =========================================
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.price || 0) * item.quantity,
    0
  );

  const total = subtotal - discount + shipping;

  // =========================================
  // PROMO
  // =========================================
  const applyPromo = () => {
    if (promoCode.toLowerCase() === "zahry") {
      setDiscount(1000);
    } else {
      setDiscount(0);
    }
  };

  // =========================================
  // SHIPPING
  // =========================================
  const handleWilayaChange = (e) => {
    const wilaya = e.target.value;

    if (wilaya === "Alger") setShipping(400);
    else if (
      ["Annaba", "Blida", "Oran"].includes(wilaya)
    )
      setShipping(600);
    else setShipping(900);
  };
const getProductImage = (product) => {
  if (!product?.photos)
    return "https://via.placeholder.com/400";

  if (Array.isArray(product.photos))
    return product.photos[0];

  try {
    const parsed = JSON.parse(product.photos);
    return Array.isArray(parsed) ? parsed[0] : product.photos;
  } catch {
    return product.photos;
  }
};
  return (
    <div className="cart-page-modern">

      <div className="cart-header">
        <h1>SHOPPING BAG</h1>
        <p>{cartItems.length} ITEMS</p>
      </div>

      {loading ? (
        <h2 className="cart-loading">
          Loading...
        </h2>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your bag is empty</h2>
          <p>Add something amazing ✨</p>
        </div>
      ) : (
        <div className="cart-grid">

          {/* LEFT */}
          <div className="cart-products">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="cart-product-card"
              >

                {/* IMAGE */}
                <div className="cart-image-wrapper">
                  <img
  src={getProductImage(item.product)}
  alt={item.product?.name}
  className="cart-product-image"
/>
                </div>

                {/* INFO */}
                <div className="cart-product-info">

                  <div>
                    <h2>
                      {item.product?.name}
                    </h2>

                    <p className="cart-brand">
                      {item.product?.brand}
                    </p>

                    <div className="cart-meta">
                      <span>
                        Size: {item.size}
                      </span>

                      <span>
                        Color: {item.color}
                      </span>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="cart-bottom">

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveItem(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

                {/* PRICE */}
                <div className="cart-price">
                  <h3>
                    {(item.product?.price || 0) *
                      item.quantity}{" "}
                    DA
                  </h3>
                </div>

              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="cart-summary">

            <h2>SUMMARY</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{subtotal} DA</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping} DA</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-{discount} DA</span>
              </div>
            )}

<select onChange={handleWilayaChange}>
  <option>Select Wilaya</option>

  <option>Adrar</option>
  <option>Chlef</option>
  <option>Laghouat</option>
  <option>Oum El Bouaghi</option>
  <option>Batna</option>
  <option>Béjaïa</option>
  <option>Biskra</option>
  <option>Béchar</option>
  <option>Blida</option>
  <option>Bouira</option>
  <option>Tamanrasset</option>
  <option>Tébessa</option>
  <option>Tlemcen</option>
  <option>Tiaret</option>
  <option>Tizi Ouzou</option>
  <option>Alger</option>
  <option>Djelfa</option>
  <option>Jijel</option>
  <option>Sétif</option>
  <option>Saïda</option>
  <option>Skikda</option>
  <option>Sidi Bel Abbès</option>
  <option>Annaba</option>
  <option>Guelma</option>
  <option>Constantine</option>
  <option>Médéa</option>
  <option>Mostaganem</option>
  <option>M’Sila</option>
  <option>Mascara</option>
  <option>Ouargla</option>
  <option>Oran</option>
  <option>El Bayadh</option>
  <option>Illizi</option>
  <option>Bordj Bou Arréridj</option>
  <option>Boumerdès</option>
  <option>El Tarf</option>
  <option>Tindouf</option>
  <option>Tissemsilt</option>
  <option>El Oued</option>
  <option>Khenchela</option>
  <option>Souk Ahras</option>
  <option>Tipaza</option>
  <option>Mila</option>
  <option>Aïn Defla</option>
  <option>Naâma</option>
  <option>Aïn Témouchent</option>
  <option>Ghardaïa</option>
  <option>Relizane</option>

  {/* nouvelles wilayas */}
  <option>Timimoun</option>
  <option>Bordj Badji Mokhtar</option>
  <option>Ouled Djellal</option>
  <option>Béni Abbès</option>
  <option>In Salah</option>
  <option>In Guezzam</option>
  <option>Touggourt</option>
  <option>Djanet</option>
  <option>El M’Ghair</option>
  <option>El Meniaa</option>
</select>

            <div className="promo-box">

              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) =>
                  setPromoCode(e.target.value)
                }
              />

              <button onClick={applyPromo}>
                APPLY
              </button>

            </div>

            <div className="summary-total">
              <span>Total</span>
              <h1>{total} DA</h1>
            </div>

           <button className="checkout-btn" onClick={handleCheckout}>
  CONTINUE TO CHECKOUT
</button>

          </div>

        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;