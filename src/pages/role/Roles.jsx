// File: src/pages/Roles.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import BaseCrud from '../../components/crud/BaseCrud';
import RoleForm from './RoleForm';
import useCrud from '../../hooks/useCrud';
import { roleApi } from '../../services/roleApi';
import RoleViewModal from './RoleViewModal';
import { useToast } from '../../hooks/useToast.jsx';

const Roles = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(roleApi);
  const { addToast } = useToast();

  // Stats
  const totalRoles = crud.data.length;
  const rolesWithPermissions = crud.data.filter(
    (r) => r.permissions && r.permissions.length > 0
  ).length;
  const rolesWithoutPermissions = crud.data.filter(
    (r) => !r.permissions || r.permissions.length === 0
  ).length;

  // Columns
  const columns = [
    {
      key: 'name',
      title: 'Role',
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
                .join('') || 'R'}
            </span>
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.name || 'Unknown'}
            </p>
            {/* <p className={cn('text-xs', palette.mutedText)}>ID: {item.id}</p> */}
          </div>
        </div>
      ),
    },
    {
      key: 'permissions',
      title: 'Permissions',
      render: (item) => (
        <div>
          <p className={cn('text-sm font-medium', palette.text)}>
            {item.permissions?.length || 0} permissions
          </p>
          <p className={cn('text-xs', palette.mutedText)}>
            {item.permissions
              ?.slice(0, 3)
              .map((p) => p.name)
              .join(', ') || 'No permissions'}
            {item.permissions?.length > 3 ? '...' : ''}
          </p>
        </div>
      ),
    },
    {
      key: 'created',
      title: 'Created',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {new Date(item.createdAt || Date.now()).toLocaleDateString()}
        </p>
      ),
    },
  ];

  const renderStats = () => (
    <>
      {[
        { label: 'Total Roles', value: totalRoles, color: 'primary' },
        {
          label: 'With Permissions',
          value: rolesWithPermissions,
          color: 'green',
        },
        {
          label: 'Without Permissions',
          value: rolesWithoutPermissions,
          color: 'gray',
        },
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

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Role rule ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Role rule deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Roles"
        description="Manage user roles and permissions"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Role' : 'Add Role'}
        renderStats={renderStats}
        renderForm={() => (
          <RoleForm
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
      <RoleViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        role={crud.selectedEntity}
      />
    </>
  );
};

export default Roles;
