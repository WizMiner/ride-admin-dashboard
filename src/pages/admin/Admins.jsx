// src/pages/Admins.jsx
import React from 'react';
import BaseCrud from '../../components/crud/BaseCrud';
import AdminForm from './AdminForm';
import useCrud from '../../hooks/useCrud';
import { adminApi } from '../../services/adminApi';
import AdminViewModal from './AdminViewModal';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import { useToast } from '../../hooks/useToast';

const Admins = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const crud = useCrud(adminApi);
  const { addToast } = useToast();

  const columns = [
    {
      key: 'fullName',
      title: 'Full Name',
      render: (a) => <p className={cn(palette.text)}>{a.fullName}</p>,
    },
    {
      key: 'username',
      title: 'Username',
      render: (a) => <p className={cn(palette.text)}>{a.username}</p>,
    },
    {
      key: 'email',
      title: 'Email',
      render: (a) => <p className={cn(palette.text)}>{a.email || 'N/A'}</p>,
    },
  ];

  // Modified save handler to use toasts
  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Admin ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Admin deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Admins"
        description="Manage admin accounts"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Admin' : 'Add Admin'}
        renderForm={() => (
          <AdminForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      <AdminViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        admin={crud.selectedEntity}
      />
    </>
  );
};

export default Admins;
