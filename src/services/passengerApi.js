import api from './auth';

export const passengerApi = {
  list: () => api.get('/api/passengers'),
  get: (id) => api.get(`/api/passengers/${id}`),
  create: (data) => api.post('/api/passengers', data),
  update: (id, data) => api.put(`/api/passengers/${id}`, data),
  delete: (id) => api.delete(`/api/passengers/${id}`),
  awardPoints: (id, points) =>
    api.post(`/api/admins/passengers/${id}/reward-points`, { points }),
};
