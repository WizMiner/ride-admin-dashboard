//src/services/tripApi.js
import bookingApiInstance from './booking';

export const tripApi = {
  list: () => bookingApiInstance.get('/trips'),
  get: (id) => bookingApiInstance.get(`/trips/${id}`),
  create: (data) => bookingApiInstance.post('/trips', data),
  update: (id, data) => bookingApiInstance.put(`/trips/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/trips/${id}`),
};
