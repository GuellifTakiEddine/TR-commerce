import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-wrapper">

      {/* HERO */}
      <div className="terms-hero">
        <h1>TERMS OF SERVICE</h1>
      </div>

      {/* CONTENT */}
      <div className="terms-content">

        <section className="terms-section">
          <h2>1. GENERAL</h2>

          <p>
            By accessing and using TR-commerce, you agree to comply with and
            be bound by these Terms of Service and all applicable laws and
            regulations.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. PRODUCTS & AVAILABILITY</h2>

          <p>
            We strive to ensure that all product descriptions, images, prices,
            and availability information are accurate. However, errors may
            occasionally occur.
          </p>

          <p>
            TR-commerce reserves the right to modify or discontinue products
            without prior notice.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. ORDERS</h2>

          <p>
            Once an order is placed, you will receive a confirmation email or
            notification. TR-commerce reserves the right to refuse or cancel
            any order for security or operational reasons.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. PAYMENTS</h2>

          <p>
            All payments must be completed using approved payment methods.
            Transactions are processed securely through trusted payment
            providers.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. SHIPPING & DELIVERY</h2>

          <p>
            Delivery times may vary depending on location and product
            availability. TR-commerce is not responsible for delays caused by
            external delivery services.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. RETURNS & REFUNDS</h2>

          <p>
            Customers may request returns or exchanges according to our return
            policy. Returned items must be unused and in original condition.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. USER ACCOUNTS</h2>

          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials and for all activities under their account.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. PRIVACY</h2>

          <p>
            Your personal information is handled according to our Privacy
            Policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. CONTACT</h2>

          <p>
            For questions regarding these Terms of Service, contact:
          </p>

          <div className="terms-contact">
            support@trcommerce.com
          </div>
        </section>

      </div>
    </div>
  );
};

export default Terms;