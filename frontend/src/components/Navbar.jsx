import React, { useState, useEffect } from "react";
import './Navbar.css';

import wishIcon from './images/wishlist.svg';
import cartIcon from './images/cart.svg';
import logo from './images/logo.svg';
import profileIcon from './images/profile.svg';
import profileIconFilled from './images/profile-filled.svg';
import cartIconFilled from './images/cart-filled.svg';
import wishIconFilled from './images/wishlist-filled.svg';
import searchIcon from './images/search.svg';
import passwordShow from "../components/images/eye-show.svg";
import passwordHide from "../components/images/eye-off.svg";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [wishHover, setWishHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [query, setQuery] = useState(""); // ✅ Search state
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from storage
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe") === "true";
    const storedUser = remember
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setRememberMe(remember);
    }
  }, []);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      } else {
        navigate("/");
        setUser(data.user);

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("rememberMe", "true");
        } else {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          localStorage.removeItem("rememberMe");
        }
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  // LOGOUT
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="marque">
        <img src={logo} alt="logo" />
      </div>

      {/* NAV LINKS */}
      <ul className="navList">
        <Link to="/"><li className={isActive("/") ? "active" : ""}>HOME<hr/></li></Link>
        <Link to="/men"><li className={isActive("/men") ? "active" : ""}>MEN<hr/></li></Link>
        <Link to="/women"><li className={isActive("/women") ? "active" : ""}>WOMEN<hr/></li></Link>
        <Link to="/kids"><li className={isActive("/kids") ? "active" : ""}>KIDS<hr/></li></Link>
        <Link to="/discover"><li className={isActive("/discover") ? "active" : ""}>DISCOVER<hr/></li></Link>
      </ul>

      {/* ✅ SEARCH BAR */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {/* PROFILE + WISHLIST + CART */}
      <div className="login-profile-wish-cart">

        {/* PROFILE */}
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
            src={profileHover ? profileIconFilled : profileIcon}
            alt="profile"
            width="24"
            height="24"
          />

          {profileDropdown && (
            <div className={`profile-dropdown ${user ? "logged-in" : ""}`}>

              {user ? (
                <>
                  <p>Welcome, {user.name}!</p>
                  <Link to="/account">My Account</Link>
                  <Link to="/orders">Orders & Returns</Link>
                  <Link to="/track">Track Order</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <h3>Sign In</h3>
                  <form onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <div className="password-wrapper-nav">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div
                        className="password-toggle-nav"
                        style={{ backgroundImage: `url(${showPassword ? passwordHide : passwordShow})` }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>

                    <div className="remember-me">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label>Remember Me</label>
                    </div>

                    <button type="submit">Login</button>
                  </form>

                  <Link to="/create-account">Create an Account</Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* WISHLIST */}
        <img
          src={wishHover ? wishIconFilled : wishIcon}
          alt="wishlist"
          width="24"
          height="24"
          onMouseEnter={() => setWishHover(true)}
          onMouseLeave={() => setWishHover(false)}
          onClick={() => navigate("/wishlist")}
        />

        {/* CART */}
        <img
          src={cartHover ? cartIconFilled : cartIcon}
          alt="cart"
          width="24"
          height="24"
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
          onClick={() => navigate("/cart")}
        />

        <div className="cart-counter">0</div>
      </div>
    </div>
  );
};

export default Navbar;
