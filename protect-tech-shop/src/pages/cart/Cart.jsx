import { useEffect, useCallback } from "react";
import { removeFromCart } from "../../services/cartService";
import { useAuth } from "../../contexts/authProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/cartItem/CartItem";

import "./Cart.css";

export const Cart = () => {
  const { calculateTotal, fetchCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRemoveFromCart = useCallback(
    async (productId) => {
      try {
        await removeFromCart(user.userId, productId);
        fetchCart();
      } catch (err) {
        console.error("Error removing product:", err);
      }
    },
    [fetchCart, user.userId]
  );

  useEffect(() => {
    fetchCart();
  }, []);

  const renderItems = () => {
    if (cartItems?.length > 0) {
      return cartItems.map((item) => (
        <CartItem
          key={item.productId}
          product={item}
          onRemove={() => handleRemoveFromCart(item.productId)}
        />
      ));
    }

    return <span>No products added to the cart!</span>
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="sub-container">
        <div>{renderItems()}</div>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <p>Shipping: Free</p>
          <p>Total: {calculateTotal(cartItems)}</p>
          <Button onClickButton={() => navigate("/checkout")}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
