// src/services/analyticsApi.js
import bookingApiInstance from './booking';

export const analyticsApi = {
  getDashboardStats: () => bookingApiInstance.get('/analytics/dashboard'),
  getDailyReport: () => bookingApiInstance.get('/analytics/reports/daily'),
  getWeeklyReport: () => bookingApiInstance.get('/analytics/reports/weekly'),
  getMonthlyReport: () => bookingApiInstance.get('/analytics/reports/monthly'),
  getFinanceOverview: (period) =>
    bookingApiInstance.get(`/analytics/finance/overview?period=${period}`),
};
