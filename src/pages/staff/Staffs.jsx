// File: src/pages/Staff.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import StaffForm from './StaffForm.jsx';
import useCrud from '../../hooks/useCrud.js';
import { staffApi } from '../../services/staffApi.js';
import StaffViewModal from './StaffViewModal.jsx';
import { useToast } from '../../hooks/useToast.jsx';

const Staffs = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(staffApi);
  const { addToast } = useToast();

  // Stats
  const totalStaff = crud.data.length;
  const activeStaff = crud.data.filter((s) => s.status).length;
  const inactiveStaff = crud.data.filter((s) => !s.status).length;

  // Columns
  const columns = [
    {
      key: 'name',
      title: 'Staff Member',
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
              {item.fullName
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'S'}
            </span>
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.fullName || 'Unknown'}
            </p>
            <p className={cn('text-sm', palette.mutedText)}>@{item.username}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'roles',
      title: 'Role', // Updated title to be more accurate
      render: (item) => (
        <p className={cn('text-sm font-medium', palette.text)}>
          {/* Access the name from the roles array. Use a fallback for items with no roles */}
          {item.roles && item.roles.length > 0 ? item.roles[0].name : 'No Role'}
        </p>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => {
        return (
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              item.status
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            )}
          >
            {item.status ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      key: 'salary',
      title: 'Salary',
      render: (item) => (
        <p className={cn('text-sm font-medium', palette.text)}>
          Birr{parseFloat(item.salary || 0).toFixed(2)}
        </p>
      ),
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Staff', value: totalStaff, color: 'primary' },
        { label: 'Active', value: activeStaff, color: 'green' },
        { label: 'Inactive', value: inactiveStaff, color: 'gray' },
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
                    : stat.color === 'gray'
                      ? 'text-gray-600'
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
                  : stat.color === 'gray'
                    ? 'bg-gray-500'
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
      <option value="1">Active</option> {/* Use '1' for the filter value */}
      <option value="0">Inactive</option> {/* Use '0' for the filter value */}
    </select>
  );

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Staff ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Staff deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Staff"
        description="Manage staff accounts and their roles"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Staff' : 'Add Staff'}
        renderStats={renderStats}
        renderFilters={renderFilters}
        renderForm={() => (
          <StaffForm
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
      <StaffViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        staff={crud.selectedEntity}
      />
    </>
  );
};

export default Staffs;
