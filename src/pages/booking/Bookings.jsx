// src/pages/booking/Bookings.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import BookingForm from './BookingForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { bookingApi } from '../../services/bookingApi.js';
import BookingViewModal from './BookingViewModal.jsx';
import { useToast } from '../../hooks/useToast.jsx';

const Bookings = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(bookingApi);
  const { addToast } = useToast();

  // Stats
  const totalBookings = crud.data.length;
  const requestedBookings = crud.data.filter(
    (b) => b.status === 'requested'
  ).length;
  const acceptedBookings = crud.data.filter(
    (b) => b.status === 'accepted'
  ).length;
  const completedBookings = crud.data.filter(
    (b) => b.status === 'completed'
  ).length;
  const canceledBookings = crud.data.filter(
    (b) => b.status === 'canceled'
  ).length;

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
      key: 'passengerId',
      title: 'Passenger ID',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.passengerId}</p>
      ),
    },
    {
      key: 'vehicleType',
      title: 'Vehicle Type',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.vehicleType}</p>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => (
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            item.status === 'requested'
              ? 'bg-yellow-100 text-yellow-800'
              : item.status === 'accepted'
                ? 'bg-blue-100 text-blue-800'
                : item.status === 'completed'
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
      key: 'fareEstimated',
      title: 'Estimated Fare',
      render: (item) => (
        <p className={cn('text-sm font-medium', palette.text)}>
          {item.fareEstimated.toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'distanceKm',
      title: 'Distance (km)',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.distanceKm.toFixed(3)}
        </p>
      ),
    },
    // {
    //   key: 'createdAt',
    //   title: 'Created At',
    //   render: (item) => (
    //     <p className={cn('text-sm', palette.mutedText)}>
    //       {new Date(item.createdAt).toLocaleString()}
    //     </p>
    //   ),
    // },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Bookings', value: totalBookings, color: 'primary' },
        { label: 'Requested', value: requestedBookings, color: 'yellow' },
        { label: 'Accepted', value: acceptedBookings, color: 'blue' },
        { label: 'Completed', value: completedBookings, color: 'green' },
        { label: 'Canceled', value: canceledBookings, color: 'red' },
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
                      : stat.color === 'yellow'
                        ? 'text-yellow-600'
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
                  : stat.color === 'blue'
                    ? 'bg-blue-500'
                    : stat.color === 'yellow'
                      ? 'bg-yellow-500'
                      : stat.color === 'red'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Booking rule ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Booking rule deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

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
      <option value="requested">Requested</option>
      <option value="accepted">Accepted</option>
      <option value="completed">Completed</option>
      <option value="canceled">Canceled</option>
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Bookings"
        description="Manage ride bookings and their statuses"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Booking' : 'Add Booking'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <BookingForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      {/* Separate modal for view mode only */}
      <BookingViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        booking={crud.selectedEntity}
      />
    </>
  );
};

export default Bookings;
