import api from './authapi';

export const driverApi = {
  list: () => api.get('/drivers'),
  get: (id) => api.get(`/drivers/${id}`),
  update: (id, data) => api.put(`/drivers/${id}`, data),
  delete: (id) => api.delete(`/drivers/${id}`),
  awardPoints: (id, points) =>
    api.post(`/admins/drivers/${id}/reward-points`, { points }),
  getPendingDocuments: () => api.get('/admin/drivers/pending-documents'),
  setDriverStatus: (id, status) =>
    api.post(`/admin/drivers/${id}/status`, { status }),
};
