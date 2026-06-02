import React from "react";
import { Link } from "react-router-dom";

import './footer.css';

import facebookBlackIcon from './images/facebookblack.svg';
import twitterIcon from './images/twitter.svg';
import instagramIcon from './images/instagram.svg';
import paypalIcon from './images/paypal.svg';
import visaIcon from './images/visa.svg';
import tiktokIcon from './images/tiktok.svg';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ABOUT */}
        <div className="footer-section about">
          <h3>TR</h3>
          <p>
            TR Website - delivering quality and service since 2025.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-section links">

          <h4>Quick Links</h4>

          <ul>
            <li>
              <Link to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                Terms of Service
              </Link>
            </li>

            <li>
              <Link to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>
          </ul>

        </div>

        {/* SOCIAL */}
        <div className="footer-section social">

          <h4>Follow Us</h4>

          <div className="social-icons">

            <a href="#">
              <img src={facebookBlackIcon} alt="Facebook" />
            </a>

            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>

            <a href="#">
              <img src={instagramIcon} alt="Instagram" />
            </a>

            <a href="#">
              <img src={tiktokIcon} alt="Tiktok" />
            </a>

          </div>
        </div>

        {/* PAYMENT */}
        <div className="footer-section payment-methods">

          <h4>Payment Methods</h4>

          <div className="payment-icons">
            <img src={paypalIcon} alt="PayPal" />
            <img src={visaIcon} alt="Visa" />
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>&copy; 2025 TR Website. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;