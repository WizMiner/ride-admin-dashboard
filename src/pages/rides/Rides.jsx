import React, { useMemo, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import useCrud from '../../hooks/useCrud.js';
import { bookingApi } from '../../services/bookingApi.js';

const Rides = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const memoizedApi = useMemo(
    () => ({
      list: bookingApi.getall,
    }),
    []
  );

  const transformData = useCallback(
    (data) => (Array.isArray(data?.rides) ? data.rides : []),
    []
  );

  const crud = useCrud(memoizedApi, {}, { transformData });

  const totalRides = crud.data.length;
  const completed = crud.data.filter((r) => r.status === 'completed').length;
  const canceled = crud.data.filter((r) => r.status === 'canceled').length;
  const requested = crud.data.filter((r) => r.status === 'requested').length;

  const columns = [
    {
      key: 'passenger.name',
      title: 'Passenger',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold',
              palette.avatarBg
            )}
          >
            {item.passenger?.name?.[0]?.toUpperCase() || 'P'}
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.passenger?.name || 'Unknown'}
            </p>
            <p className={cn('text-sm', palette.mutedText)}>
              {item.passenger?.phone || 'No phone'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'pickup.address',
      title: 'Pickup',
      render: (item) => (
        <div>
          <p className={cn('text-sm', palette.text)}>
            {item.pickup?.address || 'N/A'}
          </p>
          {item.pickup?.latitude && item.pickup?.longitude && (
            <p className={cn('text-xs', palette.mutedText)}>
              ({item.pickup.latitude.toFixed(5)},{' '}
              {item.pickup.longitude.toFixed(5)})
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'dropoff.address',
      title: 'Dropoff',
      render: (item) => (
        <div>
          <p className={cn('text-sm', palette.text)}>
            {item.dropoff?.address || 'N/A'}
          </p>
          {item.dropoff?.latitude && item.dropoff?.longitude && (
            <p className={cn('text-xs', palette.mutedText)}>
              ({item.dropoff.latitude.toFixed(5)},{' '}
              {item.dropoff.longitude.toFixed(5)})
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'distanceKm',
      title: 'Km',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.distanceKm ? item.distanceKm.toFixed(2) : '0.00'}
        </p>
      ),
    },
    {
      key: 'vehicleType',
      title: 'Vehicle',
      render: (item) => (
        <p className={cn('capitalize text-sm', palette.text)}>
          {item.vehicleType || 'N/A'}
        </p>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => (
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            item.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : item.status === 'canceled'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          )}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'fareEstimated',
      title: 'Fare (ETB)',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.fareEstimated?.toFixed(2) || '0.00'}
        </p>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (item) => (
        <p className={cn('text-sm', palette.mutedText)}>
          {new Date(item.createdAt).toLocaleString()}
        </p>
      ),
    },
  ];

  const renderStats = () =>
    [
      { label: 'Total Rides', value: totalRides, color: 'blue' },
      { label: 'Completed', value: completed, color: 'green' },
      { label: 'Requested', value: requested, color: 'yellow' },
      { label: 'Canceled', value: canceled, color: 'red' },
    ].map((stat, idx) => (
      <div
        key={idx}
        className={cn('rounded-lg p-4 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-sm', palette.mutedText)}>{stat.label}</p>
            <p
              className={cn(
                'text-2xl font-bold',
                stat.color === 'green'
                  ? 'text-green-600'
                  : stat.color === 'red'
                    ? 'text-red-600'
                    : stat.color === 'yellow'
                      ? 'text-yellow-600'
                      : palette.text
              )}
            >
              {stat.value}
            </p>
          </div>
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              stat.color === 'green'
                ? 'bg-green-500'
                : stat.color === 'red'
                  ? 'bg-red-500'
                  : stat.color === 'yellow'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
            )}
          />
        </div>
      </div>
    ));

  const renderFilters = () => (
    <select
      value={crud.filters.status || 'all'}
      onChange={(e) => crud.handleFilter('status', e.target.value)}
      className={cn(
        'px-4 py-2 rounded-md border',
        palette.border,
        palette.card,
        palette.text
      )}
    >
      <option value="all">All Status</option>
      <option value="completed">Completed</option>
      <option value="requested">Requested</option>
      <option value="canceled">Canceled</option>
    </select>
  );

  return (
    <BaseCrud
      title="Rides"
      description="Ride history analytics and trip details"
      columns={columns}
      filteredData={crud.filteredData}
      isLoading={crud.isLoading}
      searchQuery={crud.searchQuery}
      onSearchChange={(e) => crud.handleSearch(e.target.value)}
      allowAdd={false}
      onAdd={null}
      onDelete={null}
      renderStats={renderStats}
      renderFilters={renderFilters}
      palette={palette}
    />
  );
};

export default Rides;
