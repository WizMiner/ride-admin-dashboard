// src/pages/booking/Bookings.jsx
import React, { useContext, useState } from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import BookingForm from './BookingForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { bookingApi } from '../../services/bookingApi.js';
import BookingViewModal from './BookingViewModal.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import DriverAssignForm from './DriverAssignForm.jsx';
import { AuthContext } from '../../contexts/AuthContextDefinition.jsx';
import Modal from '../../components/ui/Modal';
import { UserPlus } from 'lucide-react';
import Tooltip from '../../components/ui/Tooltip';
import { useSocketEvents } from '../../hooks/useSocketEvents'; // ← This now pulls correct useSocket internally

const transformBookings = (data) => {
  if (Array.isArray(data)) return data;
  return data?.items || [];
};

const Bookings = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  // single stable crud instance
  const crud = useCrud(bookingApi, {}, { transformData: transformBookings });

  const { addToast } = useToast();

  // Stats (derived from crud.data)
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

  // get dispatcher id from auth context (no JWT decode)
  const { auth } = useContext(AuthContext);
  const dispatcherId = auth?.user?.id;

  // Assign modal state
  const [assignModal, setAssignModal] = useState({
    open: false,
    booking: null,
  });

  // Socket events for ops dashboard - listen to fleet-wide updates
  useSocketEvents({}, (eventType, payload) => {
    switch (eventType) {
      case 'bookingUpdate':
        // Refresh table on any booking update
        crud.loadData();
        break;
      case 'tripStarted':
      case 'tripOngoing':
      case 'tripCompleted':
        // Refresh for trip milestones
        crud.loadData();
        break;
      case 'pricingUpdate':
        // Could update local pricing cache if viewing
        console.log('Global pricing update:', payload);
        break;
      case 'driverLocation':
        // Fleet-wide location for ops map if implemented
        console.log('Driver location update:', payload);
        break;
      default:
        break;
    }
  });

  // Columns (add Assign Driver action)
  const columns = [
    {
      key: 'passenger.name',
      title: 'Passenger Name',
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
      key: 'pickup.address',
      title: 'Pickup Address',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.pickup?.address || 'N/A'}
        </p>
      ),
    },
    {
      key: 'dropoff.address',
      title: 'Dropoff Address',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.dropoff?.address || 'N/A'}
        </p>
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
          {(item.fareEstimated ?? 0).toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'distanceKm',
      title: 'Distance (km)',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {(item.distanceKm ?? 0).toFixed(3)}
        </p>
      ),
    },
    {
      key: 'Assign Driver',
      title: 'Assign Driver',
      render: (b) => (
        <Tooltip content="Assign Driver">
          <button
            className={cn(
              'p-2 rounded-full transition-colors',
              palette.btnPrimary
            )}
            onClick={() => setAssignModal({ open: true, booking: b })}
          >
            <UserPlus size={18} />
          </button>
        </Tooltip>
      ),
    },
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
      addToast(
        `Booking ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`,
        'success'
      );
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Booking deleted successfully!', 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
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

      {/* View modal */}
      <BookingViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        booking={crud.selectedEntity}
      />

      {/* Assign Driver Modal */}
      {assignModal.open && (
        <Modal
          isOpen={assignModal.open}
          onClose={() => setAssignModal({ open: false, booking: null })}
          title="Assign Driver"
          palette={palette}
        >
          <DriverAssignForm
            booking={assignModal.booking}
            dispatcherId={dispatcherId}
            onCancel={() => setAssignModal({ open: false, booking: null })}
            onSubmit={async (data) => {
              try {
                const bookingId =
                  assignModal.booking?.id || assignModal.booking?._id;
                await bookingApi.assign(bookingId, data);
                addToast('Driver assigned successfully', 'success');
                setAssignModal({ open: false, booking: null });
                await crud.loadData();
              } catch (err) {
                addToast(err?.message || 'Failed to assign driver', 'error');
              }
            }}
            loading={crud.actionLoading}
            palette={palette}
          />
        </Modal>
      )}
    </>
  );
};

export default Bookings;
