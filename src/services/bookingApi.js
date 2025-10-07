//src/services/bookingApi.js
import bookingApiInstance from './booking';

export const bookingApi = {
  list: () => bookingApiInstance.get('/bookings/'),
  getall: () => bookingApiInstance.get('/analytics/rides/history'),
  get: (id) => bookingApiInstance.get(`/bookings/${id}`),
  create: (data) => bookingApiInstance.post('/bookings/admin', data),
  assign: (id, data) => bookingApiInstance.post(`/bookings/${id}/assign`, data),
  update: (id, data) =>
    bookingApiInstance.post(`/bookings/${id}/lifecycle`, data),
  delete: (id) => bookingApiInstance.delete(`/bookings/${id}/lifecycle`),
};
