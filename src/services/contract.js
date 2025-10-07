// src/services/contract.js
import axios from 'axios';
import { getToken } from '../utils/authUtils';

const contractApiInstance = axios.create({
  baseURL: import.meta.env.VITE_CONTRACT_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token consistently
contractApiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default contractApiInstance;
