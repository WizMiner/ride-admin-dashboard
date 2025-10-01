import api from './auth';

export const driverApi = {
  list: () => api.get('/api/drivers'),
  get: (id) => api.get(`/api/drivers/${id}`),
  update: (id, data) => api.put(`/api/drivers/${id}`, data),
  delete: (id) => api.delete(`/api/drivers/${id}`),
  awardPoints: (id, points) =>
    api.post(`/api/admins/drivers/${id}/reward-points`, { points }),
  getPendingDocuments: () => api.get('/api/admin/drivers/pending-documents'),
  setDriverStatus: (id, status) =>
    api.post(`/api/admin/drivers/${id}/status`, { status }),
};
