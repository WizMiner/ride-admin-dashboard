// src/pages/Dashboard.jsx
import React from 'react';
import { Users, Car, MapPin, CreditCard, BarChart2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import StatsCard from '../../components/analytics/StatsCard';
import PerformanceChart from '../../components/analytics/PerformanceChart';
import { useAnalytics } from '../../hooks/useAnalytics';

const Dashboard = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const { loading, data, error } = useAnalytics();

  if (error)
    return <p className={cn('text-center py-8', 'text-red-500')}>{error}</p>;

  const { overview, today, thisWeek, thisMonth } = data.dashboard || {};

  const isLoadingData = loading.dashboard;

  const stats = [
    {
      title: 'Total Users Type',
      value: isLoadingData
        ? '...'
        : overview?.totalUsers?.toLocaleString() || '0',
      change: isLoadingData ? '...' : '+5.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Total Drivers',
      value: isLoadingData
        ? '...'
        : overview?.totalDrivers?.toLocaleString() || '0',
      change: isLoadingData ? '...' : '+3.8%',
      trend: 'up',
      icon: Car,
    },
    {
      title: 'Total Rides',
      value: isLoadingData
        ? '...'
        : overview?.totalRides?.toLocaleString() || '0',
      change: isLoadingData ? '...' : '+12.1%',
      trend: 'up',
      icon: MapPin,
    },
    {
      title: 'Total Earnings',
      value: isLoadingData
        ? '...'
        : `Birr${overview?.totalEarnings?.toFixed(2) || '0.00'}`,
      change: isLoadingData ? '...' : '+8.7%',
      trend: 'up',
      icon: CreditCard,
    },
  ];

  const performanceChartData = isLoadingData
    ? [{ name: 'Loading...', rides: 0, earnings: 0 }]
    : [
        {
          name: 'Today',
          rides: today?.rides || 0,
          earnings: today?.earnings || 0,
        },
        {
          name: 'This Week',
          rides: thisWeek?.rides || 0,
          earnings: thisWeek?.earnings || 0,
        },
        {
          name: 'This Month',
          rides: thisMonth?.rides || 0,
          earnings: thisMonth?.earnings || 0,
        },
      ];

  const recentActivities = isLoadingData
    ? [
        {
          id: 1,
          type: 'loading',
          message: 'Loading recent activity...',
          time: '',
          icon: BarChart2,
        },
        {
          id: 2,
          type: 'loading',
          message: 'Loading recent activity...',
          time: '',
          icon: BarChart2,
        },
      ]
    : [
        {
          id: 1,
          type: 'ride',
          message: `New ride completed - Birr${today?.earnings?.toFixed(2) || '0.00'} earned`,
          time: 'Just now',
          icon: MapPin,
        },
        {
          id: 2,
          type: 'stats',
          message: `${overview?.totalRides || 0} total rides this month`,
          time: 'Today',
          icon: BarChart2,
        },
      ];

  const systemStatusItems = isLoadingData
    ? [
        { name: 'API Status', status: 'Loading...', color: 'gray' },
        { name: 'Database', status: 'Loading...', color: 'gray' },
        { name: 'Payment Gateway', status: 'Loading...', color: 'gray' },
      ]
    : [
        { name: 'API Status', status: 'Online', color: 'green' },
        { name: 'Database', status: 'Healthy', color: 'green' },
        { name: 'Payment Gateway', status: 'Active', color: 'green' },
      ];

  const quickStatsData = {
    pendingPayouts: isLoadingData
      ? '0.00'
      : overview?.pendingPayouts?.toFixed(2) || '0.00',
    totalCommission: isLoadingData
      ? '0.00'
      : overview?.totalCommission?.toFixed(2) || '0.00',
    totalRides: isLoadingData ? '...' : overview?.totalRides || '0',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={cn('text-3xl font-bold', palette.text)}>Dashboard</h1>
        <p className={cn('mt-1 text-sm', palette.mutedText)}>
          Overview of your ride service performance and key metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatsCard
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            palette={palette}
            isLoading={isLoadingData}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <div
        className={cn(
          'rounded-xl p-6 shadow-md',
          palette.card,
          palette.border,
          isLoadingData && 'animate-pulse'
        )}
      >
        <h2 className={cn('text-xl font-semibold mb-4', palette.text)}>
          Performance Overview
        </h2>
        <PerformanceChart
          data={performanceChartData}
          palette={palette}
          currencySymbol="Birr"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div
            className={cn(
              'rounded-xl p-6 shadow-md',
              palette.card,
              palette.border
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn('text-xl font-semibold', palette.text)}>
                Recent Activity
              </h2>
              <button
                className={cn('text-sm hover:underline', palette.mutedText)}
              >
                View All
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-lg transition-colors',
                      palette.hover,
                      isLoadingData && 'animate-pulse'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-full bg-opacity-10',
                        palette.primaryLightBg,
                        palette.iconText
                      )}
                    >
                      {isLoadingData ? (
                        <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      {isLoadingData ? (
                        <>
                          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700 mb-1"></div>
                          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                        </>
                      ) : (
                        <>
                          <p className={cn('text-sm', palette.text)}>
                            {activity.message}
                          </p>
                          <p
                            className={cn('text-xs mt-0.5', palette.mutedText)}
                          >
                            {activity.time}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* System Status */}
          <div
            className={cn(
              'rounded-xl p-6 shadow-md',
              palette.card,
              palette.border,
              isLoadingData && 'animate-pulse'
            )}
          >
            <h3 className={cn('text-lg font-semibold mb-4', palette.text)}>
              System Status
            </h3>
            <div className="space-y-4">
              {systemStatusItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  {isLoadingData ? (
                    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                  ) : (
                    <span className={cn('text-sm', palette.text)}>
                      {item.name}
                    </span>
                  )}
                  {isLoadingData ? (
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          item.color === 'green'
                            ? 'bg-green-500'
                            : item.color === 'red'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm font-medium',
                          item.color === 'green'
                            ? 'text-green-600'
                            : item.color === 'red'
                              ? 'text-red-600'
                              : 'text-gray-500'
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className={cn(
              'rounded-xl p-6 shadow-md',
              palette.card,
              palette.border
            )}
          >
            <h3 className={cn('text-lg font-semibold mb-4', palette.text)}>
              Quick Stats
            </h3>
            {isLoadingData ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={cn('text-sm', palette.mutedText)}>
                    Pending Payouts
                  </span>
                  <span className={cn('font-medium', palette.text)}>
                    Birr{quickStatsData.pendingPayouts}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={cn('text-sm', palette.mutedText)}>
                    Total Commission
                  </span>
                  <span className={cn('font-medium', palette.text)}>
                    Birr{quickStatsData.totalCommission}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={cn('text-sm', palette.mutedText)}>
                    Completed Rides
                  </span>
                  <span className={cn('font-medium', palette.text)}>
                    {quickStatsData.totalRides}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
