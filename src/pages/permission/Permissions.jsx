import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import BaseCrud from '../../components/crud/BaseCrud';
import PermissionForm from './PermissionForm';
import useCrud from '../../hooks/useCrud';
import { permissionApi } from '../../services/permissionApi';

const Permissions = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(permissionApi);

  // Columns
  const columns = [
    {
      key: 'name',
      title: 'Permission',
      render: (item) => (
        <p className={cn('font-medium', palette.text)}>
          {item.name || 'Unnamed'}
        </p>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      render: (item) => (
        <p className={cn('text-sm', palette.mutedText)}>
          {item.description || 'No description'}
        </p>
      ),
    },
  ];

  return (
    <BaseCrud
      title="Permissions"
      description="Manage application permissions"
      columns={columns}
      filteredData={crud.filteredData}
      isLoading={crud.isLoading}
      searchQuery={crud.searchQuery}
      onSearchChange={(e) => crud.handleSearch(e.target.value)}
      onAdd={crud.handleAdd}
      onEdit={crud.handleEdit}
      onView={crud.handleView}
      onDelete={crud.handleDelete}
      isModalOpen={crud.isModalOpen}
      onModalClose={crud.handleCloseModal}
      isAlertOpen={crud.isAlertOpen}
      onAlertClose={crud.handleCloseAlert}
      onAlertConfirm={crud.handleDeleteConfirm}
      entityToDelete={crud.entityToDelete}
      modalTitle={crud.mode === 'edit' ? 'Edit Permission' : 'Add Permission'}
      renderForm={() => (
        <PermissionForm
          initialData={crud.selectedEntity}
          onSubmit={crud.handleSave}
          onCancel={crud.handleCloseModal}
          loading={crud.actionLoading}
        />
      )}
      palette={palette}
    />
  );
};

export default Permissions;
