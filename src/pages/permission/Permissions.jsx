import React from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import BaseCrud from '../../components/crud/BaseCrud';
import PermissionForm from './PermissionForm';
import useCrud from '../../hooks/useCrud';
import { permissionApi } from '../../services/permissionApi';
import { useToast } from '../../hooks/useToast';

const Permissions = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(permissionApi);
  const { addToast } = useToast();

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
  ];

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
      onAlertConfirm={handleDeleteWithToast}
      entityToDelete={crud.entityToDelete}
      actionLoading={crud.actionLoading}
      modalTitle={crud.mode === 'edit' ? 'Edit Permission' : 'Add Permission'}
      renderForm={() => (
        <PermissionForm
          initialData={crud.selectedEntity}
          onSubmit={handleSaveWithToast}
          onCancel={crud.handleCloseModal}
          loading={crud.actionLoading}
        />
      )}
      palette={palette}
    />
  );
};

export default Permissions;
