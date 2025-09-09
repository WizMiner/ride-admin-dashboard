// src/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import { analyticsApi } from '../services/analyticsApi.js';

export const useAnalytics = (initialTimeRange = 'monthly') => {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [loading, setLoading] = useState({
    dashboard: true,
    daily: false,
    weekly: false,
    monthly: false,
    finance: false,
  });
  const [data, setData] = useState({
    dashboard: null,
    daily: null,
    weekly: null,
    monthly: null,
    finance: null,
  });
  const [error, setError] = useState(null);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading((prev) => ({ ...prev, dashboard: true }));
      setError(null);
      try {
        const response = await analyticsApi.getDashboardStats();
        setData((prev) => ({ ...prev, dashboard: response.data || response }));
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading((prev) => ({ ...prev, dashboard: false }));
      }
    };
    fetchDashboardData();
  }, []);

  // Fetch reports based on timeRange
  useEffect(() => {
    const fetchReportData = async () => {
      setLoading((prev) => ({ ...prev, [timeRange]: true }));
      try {
        let response;
        switch (timeRange) {
          case 'daily':
            response = await analyticsApi.getDailyReport();
            setData((prev) => ({ ...prev, daily: response.data || response }));
            break;
          case 'weekly':
            response = await analyticsApi.getWeeklyReport();
            setData((prev) => ({ ...prev, weekly: response.data || response }));
            break;
          case 'monthly':
            response = await analyticsApi.getMonthlyReport();
            setData((prev) => ({
              ...prev,
              monthly: response.data || response,
            }));
            break;
          default:
            break;
        }
      } catch (err) {
        console.error(`${timeRange} report fetch error:`, err);
      } finally {
        setLoading((prev) => ({ ...prev, [timeRange]: false }));
      }
    };
    fetchReportData();
  }, [timeRange]);

  // Fetch finance data
  useEffect(() => {
    const fetchFinanceData = async () => {
      setLoading((prev) => ({ ...prev, finance: true }));
      try {
        const response = await analyticsApi.getFinanceOverview(timeRange);
        setData((prev) => ({ ...prev, finance: response.data || response }));
      } catch (err) {
        console.error('Finance data fetch error:', err);
      } finally {
        setLoading((prev) => ({ ...prev, finance: false }));
      }
    };
    fetchFinanceData();
  }, [timeRange]);

  return {
    timeRange,
    setTimeRange,
    loading,
    data,
    error,
  };
};
