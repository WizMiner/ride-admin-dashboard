// src/services/walletApi.js
import bookingApiInstance from './booking';

export const WalletApi = {
  list: () => bookingApiInstance.get('/wallet/admin/wallets'),
  get: (id) => bookingApiInstance.get(`/wallet/admin/wallets/${id}`),
};
