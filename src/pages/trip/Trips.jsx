// src/pages/trip/Trips.jsx
import React, { useMemo, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import TripForm from './TripForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { tripApi } from '../../services/tripApi.js';
import TripViewModal from './TripViewModal.jsx';
import { useToast } from '../../hooks/useToast.jsx';

const Trips = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const { addToast } = useToast();

  const memoizedApi = useMemo(() => tripApi, []);
  const memoizedTransformData = useCallback(
    (data) => (Array.isArray(data?.trips) ? data.trips : []),
    []
  );

  const crud = useCrud(
    memoizedApi,
    {},
    { transformData: memoizedTransformData }
  );

  // Stats
  const totalTrips = crud.data.length;
  const acceptedTrips = crud.data.filter((t) => t.status === 'accepted').length;
  const canceledTrips = crud.data.filter((t) => t.status === 'canceled').length;

  // Columns
  const columns = [
    {
      key: 'passenger.name',
      title: 'Passenger',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              palette.avatarBg,
              'text-white font-semibold'
            )}
          >
            <span className="text-sm">
              {item.passenger?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'P'}
            </span>
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
      key: 'booking.pickup.address',
      title: 'Pickup Address',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.booking?.pickup?.address || 'N/A'}
        </p>
      ),
    },
    {
      key: 'booking.dropoff.address',
      title: 'Dropoff Address',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.booking?.dropoff?.address || 'N/A'}
        </p>
      ),
    },
    {
      key: 'booking.vehicleType',
      title: 'Vehicle',
      render: (item) => (
        <p className={cn('text-sm capitalize', palette.text)}>
          {item.booking?.vehicleType || 'N/A'}
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
            item.status === 'accepted'
              ? 'bg-green-100 text-green-800'
              : item.status === 'canceled'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
          )}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'dateOfTravel',
      title: 'Travel Date',
      render: (item) => (
        <p className={cn('text-sm', palette.mutedText)}>
          {new Date(item.dateOfTravel).toLocaleString()}
        </p>
      ),
    },
  ];

  // Stats component
  const renderStats = () =>
    [
      { label: 'Total Trips', value: totalTrips, color: 'primary' },
      { label: 'Accepted', value: acceptedTrips, color: 'green' },
      { label: 'Canceled', value: canceledTrips, color: 'red' },
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
                    : palette.text
              )}
            >
              {stat.value}
            </p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              stat.color === 'green'
                ? 'bg-green-500'
                : stat.color === 'red'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
            }`}
          />
        </div>
      </div>
    ));

  // Filter dropdown
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
      <option value="accepted">Accepted</option>
      <option value="canceled">Canceled</option>
    </select>
  );

  // Save/Delete with toast
  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      addToast(
        `Trip ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`,
        'success'
      );
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Trip deleted successfully!', 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Trips"
        description="Manage completed trips and history"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        onAdd={crud.handleAdd}
        onEdit={crud.handleEdit}
        onView={crud.handleView}
        onDelete={crud.handleDelete}
        isModalOpen={crud.isModalOpen && crud.mode !== 'view'}
        onModalClose={crud.handleCloseModal}
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteWithToast}
        entityToDelete={crud.entityToDelete}
        actionLoading={crud.actionLoading}
        modalTitle={crud.mode === 'edit' ? 'Edit Trip' : 'Add Trip'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <TripForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      {/* View Modal */}
      <TripViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        trip={crud.selectedEntity}
        palette={palette}
      />
    </>
  );
};

export default Trips;
