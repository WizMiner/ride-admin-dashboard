// src/services/liveApi.js
import bookingApiInstance from './booking';

export const liveApi = {
  list: () => bookingApiInstance.get('/live'),
  get: (id) => bookingApiInstance.get(`/live/${id}`),
  create: (data) => bookingApiInstance.post('/live', data),
  update: (id, data) => bookingApiInstance.put(`/live/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/live/${id}`),
};
