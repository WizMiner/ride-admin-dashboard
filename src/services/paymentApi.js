// src/services/payment-optionsApi.js
import bookingApiInstance from './booking';

export const PaymentApi = {
  list: () => bookingApiInstance.get('/payment-options'),
  get: (id) => bookingApiInstance.get(`/payment-options/${id}`),
  create: (data) => bookingApiInstance.post('/payment-options', data),
  update: (id, data) => bookingApiInstance.put(`/payment-options/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/payment-options/${id}`),
};
