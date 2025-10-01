import api from './auth';

export const permissionApi = {
  list: () => api.get('/api/permissions'),
  get: (id) => api.get(`/api/permissions/${id}`),
  create: (data) => api.post('/api/permissions', data),
  update: (id, data) => api.put(`/api/permissions/${id}`, data),
  delete: (id) => api.delete(`/api/permissions/${id}`),
};
