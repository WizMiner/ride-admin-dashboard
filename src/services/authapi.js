import axios from 'axios';
import { getToken, logout } from '../utils/authUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTHENTICATION_BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Catch 401 → logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
