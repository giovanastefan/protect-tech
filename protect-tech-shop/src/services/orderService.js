import axios from "axios";
import { API_URL } from "../utils/constants";

const API_URL_ORDER = `${API_URL}/orders`;

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL_ORDER}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_ORDER}/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};