import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, MapPin } from 'lucide-react';

const Drivers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const drivers = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      phone: '+1 (555) 111-2222',
      status: 'online',
      rating: 4.8,
      totalRides: 156,
      location: 'Downtown'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 333-4444',
      status: 'offline',
      rating: 4.9,
      totalRides: 203,
      location: 'Airport'
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 555-6666',
      status: 'busy',
      rating: 4.7,
      totalRides: 89,
      location: 'Mall'
    },
    {
      id: 4,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 777-8888',
      status: 'online',
      rating: 4.6,
      totalRides: 134,
      location: 'University'
    }
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Drivers</h1>
          <p className="text-muted-foreground mt-1">
            Manage driver accounts and monitor their status
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add Driver
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Drivers</p>
              <p className="text-2xl font-bold text-foreground">{drivers.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Online</p>
              <p className="text-2xl font-bold text-green-600">
                {drivers.filter(d => d.status === 'online').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Busy</p>
              <p className="text-2xl font-bold text-yellow-600">
                {drivers.filter(d => d.status === 'busy').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Offline</p>
              <p className="text-2xl font-bold text-gray-600">
                {drivers.filter(d => d.status === 'offline').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <button className="btn btn-outline">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Driver</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Rating</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Total Rides</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm text-foreground">{driver.email}</p>
                      <p className="text-sm text-muted-foreground">{driver.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">{driver.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">
                    {driver.totalRides}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{driver.location}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-ghost p-2" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-ghost p-2" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn btn-ghost p-2" title="More">
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
    </div>
  );
};

export default Drivers;
