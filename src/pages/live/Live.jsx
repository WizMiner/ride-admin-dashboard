// src/pages/live/Live.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import LiveForm from './LiveForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { liveApi } from '../../services/liveApi.js';
import LiveViewModal from './LiveViewModal.jsx';

const Live = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(liveApi);

  // Stats
  const totalUpdates = crud.data.length;
  const enRoute = crud.data.filter((l) => l.status === 'en_route').length;
  const arrived = crud.data.filter((l) => l.status === 'arrived').length;

  // Columns
  const columns = [
    {
      key: 'driverId',
      title: 'Driver ID',
      render: (item) => (
        <p className={cn('font-medium', palette.text)}>{item.driverId}</p>
      ),
    },
    {
      key: 'location',
      title: 'Location',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.latitude}, {item.longitude}
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
            item.status === 'en_route'
              ? 'bg-blue-100 text-blue-800'
              : item.status === 'arrived'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
          )}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'tripId',
      title: 'Trip ID',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>{item.tripId}</p>
      ),
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Updates', value: totalUpdates, color: 'primary' },
        { label: 'En Route', value: enRoute, color: 'blue' },
        { label: 'Arrived', value: arrived, color: 'green' },
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
                  stat.color === 'blue'
                    ? 'text-blue-600'
                    : stat.color === 'green'
                      ? 'text-green-600'
                      : palette.text
                )}
              >
                {stat.value}
              </p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                stat.color === 'blue'
                  ? 'bg-blue-500'
                  : stat.color === 'green'
                    ? 'bg-green-500'
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
      <option value="en_route">En Route</option>
      <option value="arrived">Arrived</option>
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Live Updates"
        description="Manage live position updates for drivers"
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
        modalTitle={
          crud.mode === 'edit' ? 'Edit Live Update' : 'Add Live Update'
        }
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <LiveForm
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
      <LiveViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        live={crud.selectedEntity}
      />
    </>
  );
};

export default Live;
