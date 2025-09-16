// File: src/components/crud/BaseCrud.jsx
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { cn } from '../../common/utils';
import EnhancedDataTable from '../ui/EnhancedDataTable';
import Modal from '../ui/Modal';
import AlertDialog from '../ui/AlertDialog';

const BaseCrud = ({
  title,
  description,
  columns,
  filteredData,
  isLoading,
  searchQuery,
  onSearchChange,
  onAdd,
  onEdit,
  onView,
  onDelete,
  isModalOpen,
  onModalClose,
  isAlertOpen,
  onAlertClose,
  onAlertConfirm,
  entityToDelete,
  modalTitle,
  renderForm,
  renderStats,
  renderFilters,
  palette,
  actionLoading,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn('text-3xl font-bold', palette.text)}>{title}</h1>
          <p className={cn('mt-1', palette.mutedText)}>{description}</p>
        </div>
        <button
          onClick={onAdd}
          className={cn(
            'px-4 py-2 rounded-md flex items-center',
            palette.btnPrimary
          )}
        >
          <Plus size={16} className="mr-2" />
          Add {title.slice(0, -1)}
        </button>
      </div>

      {/* Stats */}
      {renderStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {renderStats()}
        </div>
      )}

      {/* Filters */}
      <div
        className={cn('rounded-lg p-6 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className={cn(
                  'absolute left-3 top-1/2 transform -translate-y-1/2',
                  palette.mutedText
                )}
                size={16}
              />
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={onSearchChange}
                className={cn(
                  'input pl-10 w-full',
                  palette.card,
                  palette.text,
                  palette.border,
                  'placeholder:text-muted-theme'
                )}
              />
            </div>
          </div>

          {renderFilters && renderFilters()}

          <button
            className={cn(
              'px-4 py-2 rounded-md border flex items-center',
              palette.border,
              palette.card,
              palette.text,
              palette.hover
            )}
          >
            <Filter size={16} className="mr-2" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <EnhancedDataTable
        columns={columns}
        data={filteredData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
      />

      {/* Edit/Add Modal */}
      {/* <Modal isOpen={isModalOpen} onClose={onModalClose} title={modalTitle}>
        {renderForm && renderForm()}
      </Modal> */}
      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={modalTitle}
        palette={palette}
      >
        {renderForm && renderForm()}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={onAlertConfirm}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${entityToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        loading={actionLoading}
        cancelText="Cancel"
      />
    </div>
  );
};

export default BaseCrud;
