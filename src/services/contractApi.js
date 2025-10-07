// src/services/contractApi.js
import contractApiInstance from './contract';

export const contractApi = {
  list: async () => {
    const res = await contractApiInstance.get('/api/contract-types');
    return res.data?.data || [];
  },

  get: async (id) => {
    const res = await contractApiInstance.get(`/api/contract-types/${id}`);
    return res.data?.data || null;
  },

  create: async (data) => {
    const res = await contractApiInstance.post('/api/contract-types', data);
    return res.data?.data || res.data;
  },

  update: async (id, data) => {
    const res = await contractApiInstance.put(
      `/api/contract-types/${id}`,
      data
    );
    return res.data?.data || res.data;
  },

  delete: async (id) => {
    const res = await contractApiInstance.delete(`/api/contract-types/${id}`);
    return res.data?.data || res.data;
  },
};

export const contractPaymentApi = {
  list: () => contractApiInstance.get('/api/admin/payments/pending'),
  approve: (id) => contractApiInstance.post(`/api/admin/payment/${id}/approve`),
  reject: (id) => contractApiInstance.post(`/api/admin/payment/${id}/reject`),
};

export const subscriptionApi = {
  list: () => contractApiInstance.get('/api/admin/subscriptions'),
  approve: (id) =>
    contractApiInstance.post(`/api/admin/subscription/${id}/approve`),
  assign: (id, data) =>
    contractApiInstance.post(
      `/api/admin/subscription/${id}/assign-driver`,
      data
    ),
};
