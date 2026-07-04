import React, { useEffect, useState } from "react";
import "./account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("info");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // =====================
  // GET USER
  // =====================
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const deleteOrder = async (orderId) => {
  try {
    await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: "DELETE",
    });

    // update UI instantly
    setOrders((prev) =>
      prev.filter((o) => o._id !== orderId)
    );

  } catch (err) {
    console.log(err);
  }
};
  // =====================
  // FETCH ORDERS
  // =====================
  const fetchOrders = async () => {
    setLoadingOrders(true);

    try {
      const res = await fetch(
        `http://localhost:5000/orders/user/${user._id}`
      );

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (active === "orders" && user?._id) {
      fetchOrders();
    }
  }, [active, user]);

  if (!user) {
    return (
      <div className="account-container">
        Please log in.
      </div>
    );
  }

  return (
    <div className="account-container">

      {/* SIDEBAR */}
      <aside className="account-sidebar">
        <h2 className="logo">ACCOUNT</h2>

        <ul>
          <li
            className={active === "info" ? "active" : ""}
            onClick={() => setActive("info")}
          >
            PERSONAL INFO
          </li>

          <li
            className={active === "orders" ? "active" : ""}
            onClick={() => setActive("orders")}
          >
            ORDERS
          </li>

          <li
            className={active === "settings" ? "active" : ""}
            onClick={() => setActive("settings")}
          >
            SETTINGS
          </li>

          <li
            className="logout"
            onClick={() => {
              localStorage.removeItem("user");
              sessionStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            LOG OUT
          </li>
        </ul>
      </aside>

      {/* CONTENT */}
      <main className="account-content">

        {/* INFO */}
        {active === "info" && (
          <div className="section">
            <h3>PERSONAL INFORMATION</h3>

            <div className="info-row">
              <span>Name</span>
              <p>{user.name}</p>
            </div>

            <div className="info-row">
              <span>Email</span>
              <p>{user.email}</p>
            </div>
          </div>
        )}

        {/* ORDERS */}
{active === "orders" && (
  <div className="section">
    <h3>ORDERS</h3>

    {loadingOrders ? (
      <p className="muted">Loading...</p>
    ) : orders.length === 0 ? (
      <p className="muted">No orders yet.</p>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="order-card">
          <button
  className="remove-order-btn"
onClick={() => deleteOrder(order._id)}>
  Remove Order
</button>

          {/* TOP */}
          <div className="order-top">
            <span className="order-status">
              {order.status}
            </span>

            <span className="order-total">
              {order.totalPrice} DA
            </span>
          </div>

          {/* ITEMS */}
          <div className="order-items">
            {order.items.map((item, i) => (
              <div key={i} className="order-item">

                <img
  className="order-img"
  src={(() => {
    let photos = item.product?.photos;

    try {
      if (typeof photos === "string") {
        photos = JSON.parse(photos);
      }

      if (
        Array.isArray(photos) &&
        typeof photos[0] === "string" &&
        photos[0].startsWith("[")
      ) {
        photos = JSON.parse(photos[0]);
      }

      return Array.isArray(photos)
        ? photos[0]
        : photos || "https://via.placeholder.com/60";
    } catch {
      return "https://via.placeholder.com/60";
    }
  })()}
  alt={item.product?.name}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/60";
  }}
/>

                <div className="order-info">
                  <span className="name">
                    {item.product?.name}
                  </span>

                  <span className="qty">
                    ×{item.quantity}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      ))
    )}
  </div>
)}

        {/* SETTINGS */}
        {active === "settings" && (
          <div className="section">
            <h3>SETTINGS</h3>
            <p className="muted">Coming soon...</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Account;