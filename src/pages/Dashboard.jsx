import React from 'react';
import { 
  Users, 
  Car, 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';
import { cn } from '../common/utils';

// Theme color mapping
const getThemeColors = (themeName) => {
  const colorMap = {
    default: { primary: 'blue-600', primaryHover: 'blue-700', primaryLight: 'blue-100' },
    dark: { primary: 'blue-500', primaryHover: 'blue-600', primaryLight: 'blue-900' },
    green: { primary: 'green-600', primaryHover: 'green-700', primaryLight: 'green-100' },
    purple: { primary: 'purple-600', primaryHover: 'purple-700', primaryLight: 'purple-100' },
    red: { primary: 'red-600', primaryHover: 'red-700', primaryLight: 'red-100' },
    orange: { primary: 'orange-600', primaryHover: 'orange-700', primaryLight: 'orange-100' },
    teal: { primary: 'teal-600', primaryHover: 'teal-700', primaryLight: 'teal-100' },
    indigo: { primary: 'indigo-600', primaryHover: 'indigo-700', primaryLight: 'indigo-100' },
    rose: { primary: 'rose-600', primaryHover: 'rose-700', primaryLight: 'rose-100' },
    emerald: { primary: 'emerald-600', primaryHover: 'emerald-700', primaryLight: 'emerald-100' }
  };
  return colorMap[themeName] || colorMap.default;
};

const Dashboard = () => {
  const { currentTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Drivers',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Car,
      color: 'text-green-600'
    },
    {
      title: 'Total Rides',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue',
      value: '$125,430',
      change: '+22.1%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'ride',
      message: 'New ride completed from Downtown to Airport',
      time: '2 minutes ago',
      icon: MapPin
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registered: john.doe@email.com',
      time: '5 minutes ago',
      icon: Users
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment processed: $25.50',
      time: '8 minutes ago',
      icon: CreditCard
    },
    {
      id: 4,
      type: 'driver',
      message: 'Driver status updated: Online',
      time: '12 minutes ago',
      icon: Car
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your ride service today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendIcon 
                  size={16} 
                  className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} 
                />
                <span className={`text-sm ml-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
              <button className="btn btn-ghost text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={cn("p-2 rounded-lg", `bg-${colors.primaryLight}`, `text-${colors.primary}`)}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="btn btn-primary w-full justify-start">
                <Users size={16} className="mr-2" />
                Add New User
              </button>
              <button className="btn btn-outline w-full justify-start">
                <Car size={16} className="mr-2" />
                Register Driver
              </button>
              <button className="btn btn-outline w-full justify-start">
                <Activity size={16} className="mr-2" />
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
