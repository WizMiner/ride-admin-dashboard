import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';
import { getPalette } from '../common/themes';
import { cn } from '../common/utils';

const Drivers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const drivers = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      phone: '+1 (555) 111-2222',
      status: 'online',
      rating: 4.8,
      totalRides: 156,
      location: 'Downtown',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 333-4444',
      status: 'offline',
      rating: 4.9,
      totalRides: 203,
      location: 'Airport',
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 555-6666',
      status: 'busy',
      rating: 4.7,
      totalRides: 89,
      location: 'Mall',
    },
    {
      id: 4,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 777-8888',
      status: 'online',
      rating: 4.6,
      totalRides: 134,
      location: 'University',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn('text-3xl font-bold', 'text-theme')}>Drivers</h1>
          <p className={cn('mt-1', 'text-muted-theme')}>
            Manage driver accounts and monitor their status
          </p>
        </div>
        <button className={cn('px-4 py-2 rounded-md', palette.btnPrimary)}>
          <Plus size={16} className="mr-2" />
          Add Driver
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className={cn('rounded-lg p-4 shadow-sm', 'bg-card', 'border-theme')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm', 'text-muted-theme')}>Total Drivers</p>
              <p className={cn('text-2xl font-bold', 'text-theme')}>
                {drivers.length}
              </p>
            </div>
            <div
              className={cn('p-2 rounded-lg', 'bg-primary-100', 'text-primary')}
            >
              <MapPin size={20} />
            </div>
          </div>
        </div>

        <div
          className={cn('rounded-lg p-4 shadow-sm', 'bg-card', 'border-theme')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm', 'text-muted-theme')}>Online</p>
              <p className={cn('text-2xl font-bold', 'text-green-600')}>
                {drivers.filter((d) => d.status === 'online').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>

        <div
          className={cn('rounded-lg p-4 shadow-sm', 'bg-card', 'border-theme')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm', 'text-muted-theme')}>Busy</p>
              <p className={cn('text-2xl font-bold', 'text-yellow-600')}>
                {drivers.filter((d) => d.status === 'busy').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          </div>
        </div>

        <div
          className={cn('rounded-lg p-4 shadow-sm', 'bg-card', 'border-theme')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm', 'text-muted-theme')}>Offline</p>
              <p className={cn('text-2xl font-bold', 'text-gray-600')}>
                {drivers.filter((d) => d.status === 'offline').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className={cn('rounded-lg p-6 shadow-sm', 'bg-card', 'border-theme')}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className={cn(
                  'absolute left-3 top-1/2 transform -translate-y-1/2',
                  'text-muted-theme'
                )}
                size={16}
              />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'input pl-10 w-full',
                  'bg-card',
                  'text-theme',
                  'border-theme',
                  'placeholder:text-muted-theme'
                )}
              />
            </div>
          </div>
          <button
            className={cn(
              'px-4 py-2 rounded-md border',
              'border-theme',
              'bg-card',
              'text-theme'
            )}
          >
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className={cn(
          'rounded-lg shadow-sm overflow-x-auto',
          'bg-card',
          'border-theme'
        )}
      >
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Driver
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Contact
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Status
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Rating
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Total Rides
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Location
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b hover:bg-opacity-5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        palette.avatarBg
                      )}
                    >
                      <span className="text-white font-semibold">
                        {driver.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className={cn('font-medium', 'text-theme')}>
                        {driver.name}
                      </p>
                      <p className={cn('text-sm', 'text-muted-theme')}>
                        ID: {driver.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <p className={cn('text-sm', 'text-theme')}>
                      {driver.email}
                    </p>
                    <p className={cn('text-sm', 'text-muted-theme')}>
                      {driver.phone}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(driver.status)
                    )}
                  >
                    {driver.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <span className={cn('text-sm font-medium', 'text-theme')}>
                      {driver.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < Math.floor(driver.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </td>

                <td className={cn('p-4 text-sm', 'text-theme')}>
                  {driver.totalRides}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className={cn('text-muted-theme')} />
                    <span className={cn('text-sm', 'text-theme')}>
                      {driver.location}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      className={cn('btn btn-ghost p-2', 'text-muted-theme')}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className={cn('btn btn-ghost p-2', 'text-muted-theme')}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={cn('btn btn-ghost p-2', 'text-muted-theme')}
                      title="More"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
