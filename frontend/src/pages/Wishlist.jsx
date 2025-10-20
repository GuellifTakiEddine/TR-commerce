import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import ProductsList from "../components/ProductsList";

const Wishlist = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const remember = localStorage.getItem("rememberMe") === "true";

   
    const storedUser = remember
      ? localStorage.getItem("user") 
      : sessionStorage.getItem("user"); 

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {user ? (
        <h2>Welcome Back, {user.name}!</h2>
        
      ) : (
        <h2>Please log in to see your wishlist.</h2>
      )}
      <ProductsList/>
      <Footer />
    </>
  );
};

export default Wishlist;
