import axios from "axios";
import { API_URL } from "../utils/constants";

const API_URL_PRODUCTS = `${API_URL}/cart`;

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL_PRODUCTS}/add`, {
      userId,
      productId,
      quantity,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${API_URL_PRODUCTS}/remove/${productId}/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const completeOrder = async (userId, paymentMethod, totalAmount, addressId) => {
  try {
    const response = await axios.post(`${API_URL_PRODUCTS}/submitOrder/${userId}`, {
      paymentMethod,
      totalAmount,
      addressId,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
