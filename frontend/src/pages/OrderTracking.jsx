import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderTracking.css";


const OrderTracking = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    "pending",
    "confirmed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ORDER:", data);
        setOrder(data?.error ? null : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getStepIndex = (status) => {
    if (!status) return 0;
    return steps.indexOf(status.toLowerCase());
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  const currentIndex = getStepIndex(order.status);

  return (
    <div>
      <h2>ORDER #{order._id.slice(-6)}</h2>

      <div>
        {steps.map((step, index) => (
          <div key={step}>
            <div
              style={{
                color: index <= currentIndex ? "green" : "gray",
              }}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      <h3>Total: {order.totalPrice} DA</h3>
      <h3>Status: {order.status}</h3>
    </div>
  );
};

export default OrderTracking;