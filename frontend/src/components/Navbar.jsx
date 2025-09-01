import React, { useState } from "react";
import './Navbar.css';
import wishIcon from './images/wishlist.svg';
import cartIcon from './images/cart.svg';
import logo from './images/logo.svg';
import profileIcon from './images/profile.svg';
import profileIconFilled from './images/profile-filled.svg';
import cartIconFilled from './images/cart-filled.svg';
import wishIconFilled from './images/wishlist-filled.svg';
import googleIcon from './images/google.svg';
import facebookIcon from './images/facebook.svg';
import searchIcon from './images/search.svg';
import passwordShow from "../components/images/eye-show.svg";
import passwordHide from "../components/images/eye-off.svg";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <— NEW: detect current route

  const [wishHover, setWishHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    setEmail("");
    setPassword("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      setSearchText("");
    }
  };

  // Function to check if path is active
  const isActive = (path) => location.pathname === path;
const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="navbar">
      <div className="marque">
        <img src={logo} alt="" />
      </div>

      <ul className="navList">
        <Link to="/">
          <li className={isActive("/") ? "active" : ""}>
            HOME
            <hr />
          </li>
        </Link>
        <Link to="/men">
          <li className={isActive("/men") ? "active" : ""}>
            MEN
            <hr />
          </li>
        </Link>
        <Link to="/women">
          <li className={isActive("/women") ? "active" : ""}>
            WOMEN
            <hr />
          </li>
        </Link>
        <Link to="/kids">
          <li className={isActive("/kids") ? "active" : ""}>
            KIDS
            <hr />
          </li>
        </Link>
        <Link to="/discover">
          <li className={isActive("/discover") ? "active" : ""}>
            DISCOVER
            <hr />
          </li>
        </Link>
      </ul>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      <div className="login-profile-wish-cart">
        <div
          className="profile-container"
          onMouseEnter={() => {
            setProfileHover(true);
            setProfileDropdown(true);
          }}
          onMouseLeave={() => {
            setProfileHover(false);
            setProfileDropdown(false);
          }}
        >
          <img
            id="profi"
            src={profileHover ? profileIconFilled : profileIcon}
            alt="profile"
            width="100"
            height="100"
          />

          {profileDropdown && (
            <div className="profile-dropdown">
              <img className="dropdown-logo" src={logo} alt="" />
              <h3 className="dropdown-title">Sign In</h3>
              <form onSubmit={handleLogin}>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              <div className="password-wrapper-nav">
  <input
    id="login-password"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    // The "top: 10px" style is now handled by the CSS class
  />
  <div
    className="password-toggle-nav"
    style={{ backgroundImage: `url(${showPassword ? passwordHide : passwordShow})` }}
    onClick={() => setShowPassword(!showPassword)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') setShowPassword(!showPassword) }}
  />
</div>

                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label id="text-checkbox" htmlFor="rememberMe">Remember Me</label>
                </div>

                <button id="sub-login" type="submit">Login</button>
              </form>

              <div className="divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>

              <div className="google-sign-in-up">
                <img src={googleIcon} alt="" />
              </div>
              <div className="google-text"><p>Google</p></div>
              <div className="facebook-logo">
                <img src={facebookIcon} alt="" />
              </div>
              <p className="facebook-text">Facebook</p>
              <div className="create-account-link">
                <Link to="/create-account">Create an Account</Link>
              </div>
              <div className="forget-password">
                <Link to="/forget-password">Forget Password?</Link>
              </div>
            </div>
          )}
        </div>

        <img
          id="wish"
          src={wishHover ? wishIconFilled : wishIcon}
          alt="wishlist"
          onMouseEnter={() => setWishHover(true)}
          onMouseLeave={() => setWishHover(false)}
          width="24"
          height="24"
          onClick={() => navigate("/wishlist")}
        />

        <img
          id="cart"
          src={cartHover ? cartIconFilled : cartIcon}
          alt="cart"
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
          width="24"
          height="24"
          onClick={() => navigate("/cart")}
        />

        <div className="cart-counter">0</div>
      </div>
    </div>
  );
};

export default Navbar;
