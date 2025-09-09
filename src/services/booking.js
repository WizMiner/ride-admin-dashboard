//src/services/booking.js
import axios from 'axios';

const bookingApiInstance = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token if needed
bookingApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default bookingApiInstance;
