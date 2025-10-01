import api from './auth';

export const staffApi = {
  list: () => api.get('/api/staff'),
  get: (id) => api.get(`/api/staff/${id}`),
  create: (data) => api.post('/api/staff', data),
  update: (id, data) => api.put(`/api/staff/${id}`, data),
  delete: (id) => api.delete(`/api/staff/${id}`),
};
