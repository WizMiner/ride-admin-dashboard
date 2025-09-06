// File: src/pages/Admins.jsx
import React from 'react';
import BaseCrud from '../../components/crud/BaseCrud';
import AdminForm from './AdminForm';
import useCrud from '../../hooks/useCrud';
import { adminApi } from '../../services/adminApi';
import AdminViewModal from './AdminViewModal';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';

const Admins = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const crud = useCrud(adminApi);

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
        onAlertConfirm={crud.handleDeleteConfirm}
        entityToDelete={crud.entityToDelete}
        modalTitle={crud.mode === 'edit' ? 'Edit Admin' : 'Add Admin'}
        renderForm={() => (
          <AdminForm
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
      <AdminViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        admin={crud.selectedEntity}
      />
    </>
  );
};

export default Admins;
