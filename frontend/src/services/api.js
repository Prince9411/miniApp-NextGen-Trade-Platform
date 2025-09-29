import axios from "axios";

const API_URL = "http://localhost:5000";

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);

export const buyProduct = (data, token) =>
  axios.post(`${API_URL}/transactions/buy`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPortfolio = (token) =>
  axios.get(`${API_URL}/transactions/portfolio`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToWatchlist = (data, token) =>
  axios.post(`${API_URL}/transactions/watchlist/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeFromWatchlist = (data, token) =>
  axios.post(`${API_URL}/transactions/watchlist/remove`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWatchlist = (token) =>
  axios.get(`${API_URL}/transactions/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
