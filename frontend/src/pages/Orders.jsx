import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/orders").then((res) => res.json()),
      fetch("http://localhost:5000/returns").then((res) => res.json()),
    ])
      .then(([ordersData, returnsData]) => {
        setOrders(ordersData);
        setReturnsData(returnsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "#1a7f37";
      case "shipped":
        return "#1f6feb";
      case "pending":
        return "#b58900";
      case "returned":
        return "#d73a49";
      default:
        return "#999";
    }
  };

  const renderList = (data) =>
    data.map((item) => (
      <div
        key={item._id}
        className="order-card"
        onClick={() => navigate(`/order-tracking/${item._id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="order-info">
          <p className="order-id">#{item._id.slice(-6)}</p>

          <p className="order-date">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>

          <p className="order-items">
            {item.products?.length || 0} items
          </p>
        </div>

        <div className="order-price">
          {item.totalPrice} DA
        </div>

        <div
          className="order-status"
          style={{ color: getStatusColor(item.status) }}
        >
          {item.status?.toUpperCase()}
        </div>
      </div>
    ));

  return (
    <div className="orders-page">

      <h1 className="orders-title">My Account</h1>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          ORDERS
        </button>

        <button
          className={activeTab === "returns" ? "active" : ""}
          onClick={() => setActiveTab("returns")}
        >
          RETURNS
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="orders-container">
          {activeTab === "orders"
            ? renderList(orders)
            : renderList(returnsData)}
        </div>
      )}
    </div>
  );
};

export default Orders;