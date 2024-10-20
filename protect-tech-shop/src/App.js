import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Home } from "./pages/home/Home";
import { Shop } from "./pages/shop/Shop";
import { AboutUs } from "./pages/aboutUs/AboutUs";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Profile } from "./pages/profile/Profile";
import { Cart } from "./pages/cart/Cart";
import { Checkout } from "./pages/checkout/Checkout";
import { OrderDetailsPage } from "./pages/checkout/orderDetailsPage/OrderDetailsPage";
import { CreateProduct } from "./pages/createProduct/CreateProduct";
import { AdminDashboard } from "./pages/adminDashboard/AdminDashboard";
import FeedbackPage from "./pages/feedback/Feedback";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/confirm" element={<OrderDetailsPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
