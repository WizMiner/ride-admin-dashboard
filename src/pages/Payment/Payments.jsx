// src/pages/Payments.jsx
import React from 'react';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import useCrud from '../../hooks/useCrud.js';
import { PaymentApi } from '../../services/paymentApi.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import { useToast } from '../../hooks/useToast.jsx';
import PaymentForm from './PaymentForm';
import PaymentViewModal from './PaymentViewModal';

const Payments = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const crud = useCrud(PaymentApi);
  const { addToast } = useToast();

  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (p) => <p className={cn(palette.text)}>{p.name}</p>,
    },
    {
      key: 'logo',
      title: 'Logo Link',
      render: (p) => (
        <a
          href={p.logo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {p.logo}
        </a>
      ),
    },
  ];

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Payment option ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Payment option deleted successfully!', 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Payment"
        description="Manage available payment providers"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Payment' : 'Add Payment'}
        renderForm={() => (
          <PaymentForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      <PaymentViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        payment={crud.selectedEntity}
      />
    </>
  );
};

export default Payments;
