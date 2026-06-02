import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent ✔");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <h1>CONTACT US</h1>
        <p>We are available to help you anytime during working hours.</p>
      </div>

      {/* CONTENT */}
      <div className="contact-container">

        {/* LEFT INFO */}
        <div className="contact-info">
          <h3>Customer Service</h3>

          <p>📧 support@trcommerce.com</p>
          <p>📞 +213 792 304 534</p>

          <p className="hours">
            Working Hours: 09:00 - 22:00
          </p>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            SEND MESSAGE
          </button>

        </form>

      </div>

      {/* CHATBOT */}
      <ChatBot />

    </div>
  );
};

export default Contact;

/* ================= CHATBOT ================= */

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! Welcome to TR Support. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const isOpenHours = () => {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 22;
  };

  const quickReplies = [
    "Track my order 📦",
    "Returns ↩",
    "Payment 💳",
    "Delivery 🚚",
  ];

  const handleQuickReply = (text) => {
    setInput(text);
    sendMessage(text);
  };

  const sendMessage = (customInput) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMsg = { from: "user", text: messageText };

    let botReply = "";

    const text = messageText.toLowerCase();

    if (!isOpenHours()) {
      botReply =
        "⚠ Our support is closed now (09:00 - 21:00). Please leave your message and we’ll respond ASAP.";
    } else if (text.includes("track")) {
      botReply =
        "📦 You can track your order in the Orders page. Enter your Order ID to see live status.";
    } else if (text.includes("return")) {
      botReply =
        "↩ Returns are available within 14 days after delivery. Go to Orders > Select order > Return.";
    } else if (text.includes("payment")) {
      botReply =
        "💳 We accept Cash on Delivery and Card payments securely.";
    } else if (text.includes("delivery")) {
      botReply =
        "🚚 Delivery takes 2–5 days depending on your region in Algeria.";
    } else {
      botReply =
        "✔ Thanks! Our support team will review your request and reply soon.";
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      { from: "bot", text: botReply },
    ]);

    setInput("");
  };

  return (
    <div className="chatbot">

      {/* FLOAT BUTTON */}
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbot-box">

          {/* HEADER */}
          <div className="chatbot-header">
            TR Support Center
          </div>

          {/* QUICK ACTIONS */}
          <div className="chatbot-quick">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(q)}
                className="quick-btn"
              >
                {q}
              </button>
            ))}
          </div>

          {/* MESSAGES */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask us anything..."
            />
            <button onClick={() => sendMessage()}>
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
