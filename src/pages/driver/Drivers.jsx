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

  const statusOptions = ['pending', 'approved', 'suspended', 'rejected'];

  const totalDrivers = crud.filteredData.length;
  const pendingCount = crud.filteredData.filter(
    (d) => d.status === 'pending'
  ).length;
  const approvedCount = crud.filteredData.filter(
    (d) => d.status === 'approved'
  ).length;
  const suspendedCount = crud.filteredData.filter(
    (d) => d.status === 'suspended'
  ).length;
  const rejectedCount = crud.filteredData.filter(
    (d) => d.status === 'rejected'
  ).length;

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
    {
      key: 'status',
      title: 'Status',
      render: (item) => {
        const statusColor =
          item.status === 'approved'
            ? 'bg-green-100 text-green-800'
            : item.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : item.status === 'suspended'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-800';

        const handleStatusChange = async (e) => {
          const newStatus = e.target.value;
          try {
            await driverApi.setDriverStatus(item.id, newStatus);
            addToast(`Driver status updated to ${newStatus}`, 'success');
            await crud.loadData();
          } catch (err) {
            addToast(err?.message || 'Failed to update status', 'error');
          }
        };

        return (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                statusColor
              )}
            >
              {item.status || 'unknown'}
            </span>
            <select
              value={item.status || 'pending'}
              onChange={handleStatusChange}
              className={cn(
                'px-2 py-1 text-xs border rounded',
                palette.border,
                palette.card,
                palette.text
              )}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        );
      },
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Drivers', value: totalDrivers, color: 'primary' },
        { label: 'Pending', value: pendingCount, color: 'yellow' },
        { label: 'Approved', value: approvedCount, color: 'green' },
        { label: 'Suspended', value: suspendedCount, color: 'orange' },
        { label: 'Rejected', value: rejectedCount, color: 'red' },
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
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Drivers"
        description="Manage driver accounts and update statuses quickly"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        onAdd={crud.handleAdd}
        allowAdd={false}
        onEdit={null}
        onView={crud.handleView}
        onDelete={crud.handleDelete}
        isModalOpen={crud.isModalOpen && crud.mode === 'view'}
        onModalClose={crud.handleCloseModal}
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteWithToast}
        entityToDelete={crud.entityToDelete}
        actionLoading={crud.actionLoading}
        modalTitle="Driver Details"
        renderStats={renderStats}
        renderFilters={renderFilters}
        palette={palette}
      />

      <DriverViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        driver={crud.selectedEntity}
      />
    </>
  );
};

export default Drivers;
