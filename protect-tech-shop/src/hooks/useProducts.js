import { useState } from "react";
import { useAuth } from "../contexts/authProvider";
import { deleteProductById, getAllProducts } from "../services/productsService";
import { getAllOrders } from "../services/orderService";

export const useProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsResponse = await getAllProducts();
      setProducts(productsResponse);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const ordersResponse = await getAllOrders();
      setOrders(ordersResponse);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
    } catch (err) {
      console.error("Error fetching products:", err);
    }

    fetchProducts()
  };

  return {
    fetchProducts,
    products,
    fetchAllOrders,
    orders,
    handleDeleteProduct
  };
};
