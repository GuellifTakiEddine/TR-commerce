import React, { useState } from "react";
import "./Register.css";
import registerImage from "../components/images/register-side.jpg";
import Footer from "../components/footer";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully!");
        setMessageType("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        setMessage(data.error || "Something went wrong");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
      setMessageType("error");
    }
  };

  return (
    <>
      <div className="register-wrapper">
        {/* Left column with image */}
        <div className="register-image">
          <img src={registerImage} alt="Register" />
        </div>

        {/* Right column with form */}
        <div className="register-container">
          <h2>Create an Account</h2>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
