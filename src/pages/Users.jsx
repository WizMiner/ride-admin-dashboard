import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Edit, Eye } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';
import { getPalette } from '../common/themes';
import { cn } from '../common/utils';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      joinDate: '2024-01-15',
      totalRides: 45,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      joinDate: '2024-01-20',
      totalRides: 32,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      status: 'inactive',
      joinDate: '2024-01-10',
      totalRides: 12,
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      status: 'active',
      joinDate: '2024-01-25',
      totalRides: 28,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn('text-3xl font-bold', 'text-theme')}>Users</h1>
          <p className={cn('mt-1', 'text-muted-theme')}>
            Manage and monitor user accounts
          </p>
        </div>
        <button className={cn('px-4 py-2 rounded-md', palette.btnPrimary)}>
          <Plus size={16} className="mr-2" />
          Add User
        </button>
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
                placeholder="Search users..."
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
                User
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
                Join Date
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Total Rides
              </th>
              <th
                className={cn('text-left p-4 font-medium', 'text-muted-theme')}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-opacity-5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        palette.avatarBg
                      )}
                    >
                      <span className="text-white font-semibold">
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className={cn('font-medium', 'text-theme')}>
                        {user.name}
                      </p>
                      <p className={cn('text-sm', 'text-muted-theme')}>
                        ID: {user.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <p className={cn('text-sm', 'text-theme')}>{user.email}</p>
                    <p className={cn('text-sm', 'text-muted-theme')}>
                      {user.phone}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(user.status)
                    )}
                  >
                    {user.status}
                  </span>
                </td>

                <td className={cn('p-4 text-sm', 'text-theme')}>
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>

                <td className={cn('p-4 text-sm', 'text-theme')}>
                  {user.totalRides}
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

export default Users;
