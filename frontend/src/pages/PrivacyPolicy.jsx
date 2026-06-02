import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">

      {/* HERO */}
      <div className="privacy-hero">
        <h1>PRIVACY POLICY</h1>

      </div>

      {/* CONTENT */}
      <div className="privacy-content">

        <section className="privacy-section">
          <h2>1. INFORMATION WE COLLECT</h2>

          <p>
            When you use TR-commerce, we may collect information such as your
            name, email address, phone number, shipping address, payment
            details, and order history.
          </p>

          <p>
            We also collect technical information including device type,
            browser information, and website activity to improve your shopping
            experience.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. HOW WE USE YOUR DATA</h2>

          <p>
            Your information is used to process orders, manage your account,
            provide customer support, improve our services, and personalize
            your experience on TR-commerce.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. COOKIES</h2>

          <p>
            TR-commerce uses cookies and similar technologies to remember your
            preferences, improve website performance, and analyze traffic.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. DATA SECURITY</h2>

          <p>
            We implement security measures designed to protect your personal
            information against unauthorized access, alteration, disclosure,
            or destruction.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. THIRD-PARTY SERVICES</h2>

          <p>
            Certain services such as payment providers and delivery companies
            may process your information in order to complete transactions and
            deliver orders.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. YOUR RIGHTS</h2>

          <p>
            You have the right to access, update, or request deletion of your
            personal information at any time.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. CONTACT US</h2>

          <p>
            If you have any questions regarding this Privacy Policy, please
            contact us:
          </p>

          <div className="privacy-contact">
            support@trcommerce.com
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;