import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { useAuth } from "../../contexts/authProvider";

import "./Menu.css";
import { searchProducts } from "../../services/productsService";

export const Menu = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleClick = (location) => {
    navigate(location);
  };

  const handleLogOut = () => {
    navigate("/");
    logout();
  };

  const handleSearch = async () => {
    try {
      // A03: Lack of Input Validation - The search query is not validated before processing,
      // which can lead to SQL Injection or other attacks.
      // A04: Fail - The absence of input validation allows malicious input to be processed,
      // potentially compromising application security and data integrity.
      const results = await searchProducts(searchQuery);
      setSearchQuery("");
      navigate("/shop", { state: { results } });
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderProfile = () => {
    return user ? (
      <>
        <img
          src="../../../images/Profile.png"
          alt="Profile"
          onClick={() => handleClick("/profile")}
        />
        <Button onClick={handleLogOut}>Logout</Button>
      </>
    ) : (
      <Button onClick={() => handleClick("/login")}>Login or Sign Up</Button>
    );
  };

  return (
    <div>
      <div className="menu-primary">
        <img
          src="../../../images/Logo.png"
          alt="Protect Tech Shop"
          width={120}
          height={120}
        />
        <div className="search-container">
          <input
            className="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="cart-container">
          <img
            src="../../../images/Cart.png"
            alt="Cart"
            onClick={() => handleClick("/cart")}
          />
          <div className="cart-details">
            <span>Shopping Cart</span>
          </div>

          {renderProfile()}
        </div>
      </div>
      <div className="menu-secondary">
        <ul>
          <li>
            <p onClick={() => handleClick("/")}>Home</p>
          </li>
          <li>
            <p onClick={() => handleClick("/shop")}>Shop</p>
          </li>
          <li>
            <p onClick={() => handleClick("/about-us")}>About Us</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
