//src/services/bookingApi.js
import bookingApiInstance from './booking';

export const bookingApi = {
  list: () => bookingApiInstance.get('/bookings'),
  get: (id) => bookingApiInstance.get(`/bookings/${id}`),
  create: (data) => bookingApiInstance.post('/bookings', data),
  update: (id, data) => bookingApiInstance.put(`/bookings/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/bookings/${id}`),
};
