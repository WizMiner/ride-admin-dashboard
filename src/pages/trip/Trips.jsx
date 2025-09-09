// src/pages/trip/Trips.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import TripForm from './TripForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { tripApi } from '../../services/tripApi.js';
import TripViewModal from './TripViewModal.jsx';

const Trips = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(tripApi);

  // Stats
  const totalTrips = crud.data.length;
  const completedTrips = crud.data.filter(
    (t) => t.status === 'completed'
  ).length;
  const inProgressTrips = crud.data.filter(
    (t) => t.status === 'in_progress'
  ).length; // Assuming possible status

  // Columns
  const columns = [
    // {
    //   key: '_id',
    //   title: 'ID',
    //   render: (item) => (
    //     <p className={cn('font-medium', palette.text)}>{item._id}</p>
    //   ),
    // },
    {
      key: 'bookingId',
      title: 'Booking ID',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.bookingId}</p>
      ),
    },
    {
      key: 'driverId',
      title: 'Driver ID',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.driverId}</p>
      ),
    },
    {
      key: 'passengerId',
      title: 'Passenger ID',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.passengerId}</p>
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
              : item.status === 'in_progress'
                ? 'bg-blue-100 text-blue-800'
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

  const renderStats = () => (
    <>
      {[
        { label: 'Total Trips', value: totalTrips, color: 'primary' },
        { label: 'Completed', value: completedTrips, color: 'green' },
        { label: 'In Progress', value: inProgressTrips, color: 'blue' },
      ].map((stat, idx) => (
        <div
          key={idx}
          className={cn(
            'rounded-lg p-4 shadow-sm',
            palette.card,
            palette.border
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm', palette.mutedText)}>{stat.label}</p>
              <p
                className={cn(
                  'text-2xl font-bold',
                  stat.color === 'green'
                    ? 'text-green-600'
                    : stat.color === 'blue'
                      ? 'text-blue-600'
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
                  : stat.color === 'blue'
                    ? 'bg-blue-500'
                    : 'bg-blue-500'
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );

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
      <option value="in_progress">In Progress</option>
    </select>
  );

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
        onAlertConfirm={crud.handleDeleteConfirm}
        entityToDelete={crud.entityToDelete}
        modalTitle={crud.mode === 'edit' ? 'Edit Trip' : 'Add Trip'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <TripForm
            initialData={crud.selectedEntity}
            onSubmit={crud.handleSave}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      {/* Separate modal for view mode only */}
      <TripViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        trip={crud.selectedEntity}
      />
    </>
  );
};

export default Trips;
