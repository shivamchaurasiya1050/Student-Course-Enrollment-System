import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};