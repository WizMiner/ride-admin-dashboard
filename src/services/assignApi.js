//src/services/assignApi.js
import bookingApiInstance from './booking';

export const assignApi = {
  list: () => bookingApiInstance.get('/assignments/'),
  get: (id) => bookingApiInstance.get(`/assignments/${id}`),
  create: (data) => bookingApiInstance.post('/assignments', data),
  update: (id, data) => bookingApiInstance.post(`/assignments/${id}`, data),
  delete: (id) => bookingApiInstance.delete(`/assignments/${id}`),
};
