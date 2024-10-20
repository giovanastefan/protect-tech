import axios from 'axios';
import { API_URL } from '../utils/constants'

const API_URL_PRODUCTS = `${API_URL}/products`

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/`);

    return response.data;
  } catch (error) {
      throw new Error(error.response.data.message);    
  }
}

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/search`, {
      params: { q: query }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteProductById = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL_PRODUCTS}/delete/${productId}`);

    return response.data;
  } catch (error) {
      throw new Error(error.response.data.message);    
  }
}
