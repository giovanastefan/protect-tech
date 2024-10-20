import axios from "axios";
import { API_URL } from "../utils/constants";

const API_URL_USERS = `${API_URL}/users`;

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_USERS}/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL_USERS}/register`, {
      email: user.email,
      password: user.password,
      fname: user.firstName,
      lname: user.lastName,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL_USERS}/login`, {
      email: user.email,
      password: user.password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerAddress = async (userId, address) => {
  try {
    const response = await axios.post(`${API_URL_USERS}/address`, {
      userId,
      ...address
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
