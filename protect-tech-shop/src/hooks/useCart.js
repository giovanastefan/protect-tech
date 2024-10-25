import { useState } from "react";
import { addToCart, completeOrder, getCart } from "../services/cartService";
import { useAuth } from "../contexts/authProvider";

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(user.userId, productId, quantity);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const calculateTotal = (items) => {
    return items
      ?.reduce(
        (total, item) =>
          total + (item.promotionalPrice || item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const fetchCart = async () => {
    try {
      const cartResponse = await getCart(user.userId);
      setCartItems(cartResponse);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleCreateOrder = async (paymentMethod, addressId) => {
    await fetchCart();
    const totalAmount = calculateTotal(cartItems);
    console.log(totalAmount);

    try {
      await completeOrder(user.userId, paymentMethod, totalAmount, addressId);
    } catch (err) {
      console.log("Error submitting order, please try again", err);
    }
  };

  return {
    calculateTotal,
    handleAddToCart,
    handleCreateOrder,
    fetchCart,
    cartItems,
  };
};
