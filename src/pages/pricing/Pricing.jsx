// src/pages/pricing/Pricing.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import PricingForm from './PricingForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { pricingApi } from '../../services/pricingApi.js';
import PricingViewModal from './PricingViewModal.jsx';

const Pricing = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(pricingApi);

  // Stats
  const totalPricing = crud.data.length;
  const activeSurge = crud.data.filter((p) => p.surgeMultiplier > 1).length;

  // Columns
  const columns = [
    {
      key: 'vehicleType',
      title: 'Vehicle Type',
      render: (item) => (
        <p className={cn('font-medium', palette.text)}>{item.vehicleType}</p>
      ),
    },
    {
      key: 'baseFare',
      title: 'Base Fare',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.baseFare.toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'perKm',
      title: 'Per KM',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.perKm.toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'perMinute',
      title: 'Per Minute',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.perMinute.toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'waitingPerMinute',
      title: 'Waiting Per Minute',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.waitingPerMinute.toFixed(2)} Birr
        </p>
      ),
    },
    {
      key: 'surgeMultiplier',
      title: 'Surge Multiplier',
      render: (item) => (
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            item.surgeMultiplier > 1
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          )}
        >
          {item.surgeMultiplier}x
        </span>
      ),
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Pricing Rules', value: totalPricing, color: 'primary' },
        { label: 'Active Surge', value: activeSurge, color: 'yellow' },
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
                  stat.color === 'yellow' ? 'text-yellow-600' : palette.text
                )}
              >
                {stat.value}
              </p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                stat.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );

  const renderFilters = () => (
    <select
      value={crud.filters.vehicleType || 'all'}
      onChange={(e) => crud.handleFilter('vehicleType', e.target.value)}
      className={cn(
        'px-4 py-2 rounded-md border',
        palette.border,
        palette.card,
        palette.text
      )}
    >
      <option value="all">All Vehicle Types</option>
      <option value="mini">Mini</option>
      <option value="sedan">Sedan</option>
      <option value="van">Van</option>
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Pricing"
        description="Manage pricing rules for different vehicle types"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Pricing' : 'Add Pricing'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <PricingForm
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
      <PricingViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        pricing={crud.selectedEntity}
      />
    </>
  );
};

export default Pricing;
