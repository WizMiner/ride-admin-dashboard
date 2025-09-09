// src/services/pricingApi.js
import bookingApiInstance from './booking';

export const pricingApi = {
  list: () => bookingApiInstance.get('/pricing'),
  get: (id) => bookingApiInstance.get(`/pricing/${id}`),
  create: (data) => bookingApiInstance.post('/pricing', data),
  update: (id, data) => bookingApiInstance.put(`/pricing/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/pricing/${id}`),
};
