// src/services/booking.js
import axios from 'axios';
import { getToken } from '../utils/authUtils';

const bookingApiInstance = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token consistently
bookingApiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default bookingApiInstance;
