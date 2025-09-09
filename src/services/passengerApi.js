import api from './auth';

export const passengerApi = {
  list: () => api.get('/passengers'),
  get: (id) => api.get(`/passengers/${id}`),
  update: (id, data) => api.put(`/passengers/${id}`, data),
  delete: (id) => api.delete(`/passengers/${id}`),
  awardPoints: (id, points) =>
    api.post(`/admins/passengers/${id}/reward-points`, { points }),
};
