// src/pages/Analytics.jsx
import React from 'react';
import {
  BarChart3,
  Calendar,
  PieChart as PieChartIcon,
  Car,
  Users,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import StatsCard from '../../components/analytics/StatsCard.jsx';
import PerformanceChart from '../../components/analytics/PerformanceChart.jsx';
import TimeRangeFilter from '../../components/analytics/TimeRangeFilter.jsx';
import FinancePieChart from '../../components/analytics/FinancePieChart.jsx';
import { useAnalytics } from '../../hooks/useAnalytics.js';

const Analytics = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const { timeRange, setTimeRange, loading, data, error } = useAnalytics();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={cn('text-red-500 text-lg')}>{error}</p>
      </div>
    );
  }

  const isLoadingDashboard = loading.dashboard;
  const isLoadingTimeRange = loading[timeRange];

  const { overview, today, thisWeek, thisMonth } = data.dashboard || {};

  const stats = [
    {
      title: 'Total Users Type',
      value: isLoadingDashboard
        ? '...'
        : overview?.totalUsers.toLocaleString() || '0',
      change: isLoadingDashboard ? '...' : '+5.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Total Drivers',
      value: isLoadingDashboard
        ? '...'
        : overview?.totalDrivers.toLocaleString() || '0',
      change: isLoadingDashboard ? '...' : '+3.8%',
      trend: 'up',
      icon: Car,
    },
    {
      title: 'Total Rides',
      value: isLoadingDashboard
        ? '...'
        : overview?.totalRides.toLocaleString() || '0',
      change: isLoadingDashboard ? '...' : '+12.1%',
      trend: 'up',
      icon: MapPin,
    },
    {
      title: 'Total Earnings',
      value: isLoadingDashboard
        ? '...'
        : `Birr${overview?.totalEarnings?.toFixed(2) || '0.00'}`,
      change: isLoadingDashboard ? '...' : '+8.7%',
      trend: 'up',
      icon: CreditCard,
    },
  ];

  const performanceData = isLoadingDashboard
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

  const financeData = isLoadingDashboard
    ? [{ name: 'Loading...', value: 1 }]
    : data.finance
      ? [
          { name: 'Revenue', value: data.finance.totalRevenue || 0 },
          { name: 'Commission', value: data.finance.commissionEarned || 0 },
          { name: 'Pending Payouts', value: data.finance.pendingPayouts || 0 },
        ]
      : [];

  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={cn('text-3xl font-bold', palette.text)}>Analytics</h1>
          <p className={cn('mt-1 text-sm', palette.mutedText)}>
            Detailed insights and performance metrics for your ride service.
          </p>
        </div>
        <TimeRangeFilter
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onExport={handleExport}
          palette={palette}
        />
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
            isLoading={isLoadingDashboard}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div
          className={cn(
            'rounded-xl p-6 shadow-md',
            palette.card,
            palette.border,
            isLoadingDashboard && 'animate-pulse'
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn('text-xl font-semibold', palette.text)}>
              Performance Overview
            </h2>
            <BarChart3 size={20} className={cn(palette.mutedText)} />
          </div>
          <PerformanceChart
            data={performanceData}
            palette={palette}
            currencySymbol="Birr"
          />
        </div>

        {/* Finance Distribution */}
        <div
          className={cn(
            'rounded-xl p-6 shadow-md',
            palette.card,
            palette.border,
            isLoadingDashboard && 'animate-pulse'
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn('text-xl font-semibold', palette.text)}>
              Financial Distribution
            </h2>
            <PieChartIcon size={20} className={cn(palette.mutedText)} />
          </div>
          <FinancePieChart
            data={financeData}
            palette={palette}
            currencySymbol="Birr"
          />
        </div>
      </div>

      {/* Detailed Reports */}
      <div
        className={cn('rounded-xl p-6 shadow-md', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-xl font-semibold', palette.text)}>
            {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Report
          </h2>
          <Calendar size={20} className={cn(palette.mutedText)} />
        </div>

        {isLoadingTimeRange ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={cn('p-4 rounded-lg', palette.card)}>
                <div
                  className={cn(
                    'h-4 rounded w-1/2 mb-2',
                    palette.mutedText,
                    'bg-opacity-20'
                  )}
                ></div>
                <div
                  className={cn(
                    'h-8 rounded w-3/4',
                    palette.mutedText,
                    'bg-opacity-20'
                  )}
                ></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data[timeRange] && (
              <>
                <div className={cn('p-4 rounded-lg', palette.hover)}>
                  <p className={cn('text-sm font-medium', palette.mutedText)}>
                    Total Rides
                  </p>
                  <p className={cn('text-2xl font-bold mt-1', palette.text)}>
                    {data[timeRange].totalRides}
                  </p>
                </div>
                <div className={cn('p-4 rounded-lg', palette.hover)}>
                  <p className={cn('text-sm font-medium', palette.mutedText)}>
                    Total Revenue
                  </p>
                  <p className={cn('text-2xl font-bold mt-1', palette.text)}>
                    Birr{data[timeRange].totalRevenue?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className={cn('p-4 rounded-lg', palette.hover)}>
                  <p className={cn('text-sm font-medium', palette.mutedText)}>
                    Completed Rides
                  </p>
                  <p className={cn('text-2xl font-bold mt-1', palette.text)}>
                    {data[timeRange].completedRides}
                  </p>
                </div>
                <div className={cn('p-4 rounded-lg', palette.hover)}>
                  <p className={cn('text-sm font-medium', palette.mutedText)}>
                    Average Fare
                  </p>
                  <p className={cn('text-2xl font-bold mt-1', palette.text)}>
                    Birr{data[timeRange].averageFare?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Top Performers */}
      {isLoadingDashboard ||
      !data.finance ||
      !data.finance.topEarningDrivers ||
      data.finance.topEarningDrivers.length === 0 ? (
        <div
          className={cn(
            'rounded-xl p-6 shadow-md animate-pulse',
            palette.card,
            palette.border
          )}
        >
          <div
            className={cn(
              'h-6 rounded w-1/2 mb-4',
              palette.mutedText,
              'bg-opacity-20'
            )}
          ></div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full',
                    palette.mutedText,
                    'bg-opacity-20'
                  )}
                ></div>
                <div>
                  <div
                    className={cn(
                      'h-4 rounded w-24 mb-1',
                      palette.mutedText,
                      'bg-opacity-20'
                    )}
                  ></div>
                  <div
                    className={cn(
                      'h-3 rounded w-16',
                      palette.mutedText,
                      'bg-opacity-20'
                    )}
                  ></div>
                </div>
              </div>
              <div
                className={cn(
                  'h-4 rounded w-16',
                  palette.mutedText,
                  'bg-opacity-20'
                )}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'rounded-xl p-6 shadow-md',
            palette.card,
            palette.border
          )}
        >
          <h2 className={cn('text-xl font-semibold mb-4', palette.text)}>
            Top Earning Drivers
          </h2>
          <div className="space-y-4">
            {data.finance.topEarningDrivers.map((driver, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-full',
                      'bg-primary bg-opacity-10 text-primary'
                    )}
                  >
                    <Car size={16} />
                  </div>
                  <div>
                    <p className={cn('font-medium', palette.text)}>
                      Driver {driver._id}
                    </p>
                    <p className={cn('text-sm', palette.mutedText)}>
                      {driver.totalRides} rides
                    </p>
                  </div>
                </div>
                <p className={cn('font-bold', palette.text)}>
                  Birr{driver.totalEarnings.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
