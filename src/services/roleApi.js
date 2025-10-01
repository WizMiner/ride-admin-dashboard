import api from './auth';

export const roleApi = {
  list: () => api.get('/api/roles'),
  get: (id) => api.get(`/api/roles/${id}`),
  create: (data) => api.post('/api/roles', data),
  update: (id, data) => api.put(`/api/roles/${id}`, data),
  delete: (id) => api.delete(`/api/roles/${id}`),
};
