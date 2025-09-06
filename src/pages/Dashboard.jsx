import React from 'react';
import {
  Users,
  Car,
  MapPin,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';
import { getPalette } from '../common/themes';
import { cn } from '../common/utils';

const Dashboard = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      colorClass: 'text-primary',
    },
    {
      title: 'Active Drivers',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Car,
      colorClass: 'text-primary',
    },
    {
      title: 'Total Rides',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: MapPin,
      colorClass: 'text-primary',
    },
    {
      title: 'Revenue',
      value: '$125,430',
      change: '+22.1%',
      trend: 'up',
      icon: CreditCard,
      colorClass: 'text-primary',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'ride',
      message: 'New ride completed from Downtown to Airport',
      time: '2 minutes ago',
      icon: MapPin,
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registered: john.doe@email.com',
      time: '5 minutes ago',
      icon: Users,
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment processed: $25.50',
      time: '8 minutes ago',
      icon: CreditCard,
    },
    {
      id: 4,
      type: 'driver',
      message: 'Driver status updated: Online',
      time: '12 minutes ago',
      icon: Car,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={cn('text-3xl font-bold', 'text-theme')}>Dashboard</h1>
        <p className={cn('mt-1', 'text-muted-theme')}>
          Welcome back! Here's what's happening with your ride service today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div
              key={idx}
              className={cn(
                'rounded-lg p-6 shadow-sm',
                'bg-card',
                'border-theme'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn('text-sm font-medium', 'text-muted-theme')}>
                    {stat.title}
                  </p>
                  <p className={cn('text-2xl font-bold mt-1', 'text-theme')}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-lg',
                    'bg-primary-100',
                    'text-primary'
                  )}
                >
                  <Icon size={24} />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <TrendIcon
                  size={16}
                  className={
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }
                />
                <span
                  className={cn(
                    'text-sm ml-1',
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {stat.change}
                </span>
                <span className={cn('text-sm ml-1', 'text-muted-theme')}>
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className={cn(
              'rounded-lg p-6 shadow-sm',
              'bg-card',
              'border-theme'
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={cn('text-xl font-semibold', 'text-theme')}>
                Recent Activity
              </h2>
              <button
                className={cn('btn btn-ghost text-sm', 'text-muted-theme')}
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg transition-colors',
                      'hover-theme'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        'bg-primary-100',
                        'text-primary'
                      )}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm', 'text-theme')}>
                        {activity.message}
                      </p>
                      <p className={cn('text-xs mt-1', 'text-muted-theme')}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={cn(
              'rounded-lg p-6 shadow-sm',
              'bg-card',
              'border-theme'
            )}
          >
            <h3 className={cn('text-lg font-semibold', 'text-theme')}>
              System Status
            </h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className={cn('text-sm', 'text-muted-theme')}>
                  API Status
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className={cn('text-sm', 'text-green-600')}>
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={cn('text-sm', 'text-muted-theme')}>
                  Database
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className={cn('text-sm', 'text-green-600')}>
                    Healthy
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={cn('text-sm', 'text-muted-theme')}>
                  Payment Gateway
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className={cn('text-sm', 'text-green-600')}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'rounded-lg p-6 shadow-sm',
              'bg-card',
              'border-theme'
            )}
          >
            <h3 className={cn('text-lg font-semibold', 'text-theme')}>
              Quick Actions
            </h3>
            <div className="space-y-2 mt-4">
              <button
                className={cn(
                  'w-full justify-start p-2 rounded-md',
                  palette.btnPrimary
                )}
              >
                <Users size={16} className="mr-2" />
                Add New User
              </button>
              <button
                className={cn(
                  'w-full justify-start p-2 rounded-md',
                  'border-theme',
                  'bg-card',
                  'text-theme'
                )}
              >
                <Car size={16} className="mr-2" />
                Register Driver
              </button>
              <button
                className={cn(
                  'w-full justify-start p-2 rounded-md',
                  'border-theme',
                  'bg-card',
                  'text-theme'
                )}
              >
                <TrendingUp size={16} className="mr-2" />
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
