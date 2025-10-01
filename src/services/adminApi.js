import api from './auth';

export const adminApi = {
  list: () => api.get('/api/admins'),
  get: (id) => api.get(`/api/admins/${id}`),
  create: (data) => api.post('/api/admins', data),
  update: (id, data) => api.put(`/api/admins/${id}`, data),
  delete: (id) => api.delete(`/api/admins/${id}`),
};
