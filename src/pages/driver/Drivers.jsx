// File: src/pages/Drivers.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import BaseCrud from '../../components/crud/BaseCrud';
import DriverForm from './DriverForm';
import useCrud from '../../hooks/useCrud';
import { driverApi } from '../../services/driverApi';
import { useToast } from '../../hooks/useToast';
import DriverViewModal from './DriverViewModal.jsx';

const Drivers = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(driverApi);
  const { addToast } = useToast();

  // Stats
  const totalDrivers = crud.filteredData.length;
  const onlineDrivers = crud.filteredData.filter(
    (d) => d.status === 'online'
  ).length;
  // const busyDrivers = crud.filteredData.filter(
  //   (d) => d.status === 'busy'
  // ).length;
  const offlineDrivers = crud.filteredData.filter(
    (d) => d.status === 'offline'
  ).length;
  const pending = crud.filteredData.filter(
    (d) => d.status === 'pending'
  ).length;

  // Columns
  const columns = [
    {
      key: 'name',
      title: 'Driver',
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
              {item.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'D'}
            </span>
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.name || 'Unknown'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (item) => (
        <div>
          <p className={cn('text-sm', palette.text)}>
            {item.email || 'No email'}
          </p>
          <p className={cn('text-sm', palette.mutedText)}>{item.phone}</p>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => {
        const statusColor =
          item.status === 'online'
            ? 'bg-green-100 text-green-800'
            : item.status === 'busy'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800';
        return (
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              statusColor
            )}
          >
            {item.status || 'unknown'}
          </span>
        );
      },
    },
    {
      key: 'vehicle',
      title: 'Vehicle',
      render: (item) => (
        <div>
          <p className={cn('text-sm', palette.text)}>
            {item.carPlate || 'No plate'}
          </p>
          <p className={cn('text-xs', palette.mutedText)}>
            {item.carModel || 'No model'} • {item.carColor || 'No color'}
          </p>
        </div>
      ),
    },
    {
      key: 'rating',
      title: 'Rating',
      render: (item) => (
        <div className="flex items-center gap-1">
          <span className={cn('text-sm font-medium', palette.text)}>
            {item.rating || 0}
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className={cn('text-xs', palette.mutedText)}>
            ({item.ratingCount || 0})
          </span>
        </div>
      ),
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Drivers', value: totalDrivers, color: 'primary' },
        { label: 'Online', value: onlineDrivers, color: 'green' },
        // { label: 'Busy', value: busyDrivers, color: 'yellow' },
        { label: 'Offline', value: offlineDrivers, color: 'gray' },
        { label: 'Pending', value: pending, color: 'yellow' },
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
                    : stat.color === 'yellow'
                      ? 'text-yellow-600'
                      : stat.color === 'gray'
                        ? 'text-gray-600'
                        : palette.text
                )}
              >
                {stat.value}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full bg-${stat.color}-500`} />
          </div>
        </div>
      ))}
    </>
  );

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Driver ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Driver deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const renderFilters = () => (
    <select
      value={crud.filters.status}
      onChange={(e) => crud.handleFilter('status', e.target.value)}
      className={cn(
        'px-4 py-2 rounded-md border',
        palette.border,
        palette.card,
        palette.text
      )}
    >
      <option value="all">All Status</option>
      <option value="online">Online</option>
      <option value="pending">Pending</option>
      <option value="busy">Busy</option>
      <option value="offline">Offline</option>
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Drivers"
        description="Manage driver accounts and monitor their status"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        onAdd={crud.handleAdd}
        allowAdd={false}
        onEdit={crud.handleEdit}
        onView={crud.handleView}
        onDelete={crud.handleDelete}
        isModalOpen={crud.isModalOpen && crud.mode !== 'view'}
        onModalClose={crud.handleCloseModal}
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteWithToast}
        entityToDelete={crud.entityToDelete}
        modalTitle={crud.mode === 'edit' ? 'Edit Driver' : 'Add Driver'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <DriverForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
          />
        )}
        palette={palette}
      />

      {/* FIX: Add the separate view modal component */}
      <DriverViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        driver={crud.selectedEntity}
      />
    </>
  );
};

export default Drivers;
