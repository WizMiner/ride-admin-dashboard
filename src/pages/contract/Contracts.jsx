import React from 'react';
import BaseCrud from '../../components/crud/BaseCrud';
import ContractForm from './ContractForm';
import useCrud from '../../hooks/useCrud';
import { contractApi } from '../../services/contractApi';
import ContractViewModal from './ContractViewModal';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import { useToast } from '../../hooks/useToast';

const Contracts = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const crud = useCrud(contractApi);
  const { addToast } = useToast();

  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (c) => <p className={cn(palette.text)}>{c.name}</p>,
    },
    {
      key: 'description',
      title: 'Description',
      render: (c) => <p className={cn(palette.text)}>{c.description}</p>,
    },
    {
      key: 'base_price_per_km',
      title: 'Price/km',
      render: (c) => <p className={cn(palette.text)}>{c.base_price_per_km}</p>,
    },
    {
      key: 'maximum_passengers',
      title: 'Max Passengers',
      render: (c) => <p className={cn(palette.text)}>{c.maximum_passengers}</p>,
    },
    {
      key: 'is_active',
      title: 'Active',
      render: (c) => (
        <p className={cn(palette.text)}>{c.is_active ? 'Yes' : 'No'}</p>
      ),
    },
  ];

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Contract ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Contract deleted successfully!', 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Contracts"
        description="Manage contract types"
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
        modalTitle={crud.mode === 'edit' ? 'Edit Contract' : 'Add Contract'}
        renderForm={() => (
          <ContractForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      <ContractViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        contract={crud.selectedEntity}
      />
    </>
  );
};

export default Contracts;
