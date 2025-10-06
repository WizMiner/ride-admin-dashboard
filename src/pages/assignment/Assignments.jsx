// File: src/pages/assignment/Assignments.jsx
import React, { useState } from 'react';
import BaseCrud from '../../components/crud/BaseCrud';
import useCrud from '../../hooks/useCrud';
import { assignApi } from '../../services/assignApi';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import Tooltip from '../../components/ui/Tooltip';
import { useToast } from '../../hooks/useToast';
import { UserPlus } from 'lucide-react';
import BookingAssignForm from './BookingAssignForm';

const Assignments = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const crud = useCrud(assignApi); // standard CRUD

  const { addToast } = useToast();

  // selected assignment for assigning booking
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const columns = [
    { key: 'id', title: 'ID', render: (a) => a.id },
    { key: 'driverId', title: 'Driver', render: (a) => a.driverId },
    { key: 'bookingId', title: 'Booking', render: (a) => a.bookingId || 'N/A' },
    {
      key: 'actions',
      title: 'Actions',
      render: (a) => (
        <div className="flex items-center gap-2">
          <Tooltip content="Assign Booking">
            <button
              onClick={() => setSelectedAssignment(a)}
              className={cn(
                'p-2 rounded-full transition-colors',
                palette.btnPrimary
              )}
            >
              <UserPlus size={18} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleDeleteAssignment = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Assignment deleted successfully', 'success');
    } catch (err) {
      addToast(err?.message || 'Failed to delete assignment', 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Assignments"
        description="View and manage driver assignments"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        allowAdd={false}
        onAdd={null} // disallow add
        onEdit={null} // disallow edit
        onDelete={crud.handleDelete} // allow delete
        isModalOpen={false} // no modal for add/edit
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteAssignment}
        entityToDelete={crud.entityToDelete}
        actionLoading={crud.actionLoading}
        palette={palette}
      />

      {/* Assign Booking Modal */}
      {selectedAssignment && (
        <BaseCrud.Modal
          title={`Assign Booking to Driver ${selectedAssignment.driverId}`}
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        >
          <BookingAssignForm
            assignment={selectedAssignment}
            palette={palette}
            loading={crud.actionLoading}
            onCancel={() => setSelectedAssignment(null)}
            onSubmit={async ({ driverId, bookingId }) => {
              try {
                // Update the assignment with the selected booking
                await assignApi.update(selectedAssignment.id, {
                  driverId,
                  bookingId,
                });
                addToast('Booking assigned successfully', 'success');
                setSelectedAssignment(null);
                await crud.loadData(); // refresh table
              } catch (err) {
                addToast(err?.message || 'Failed to assign booking', 'error');
              }
            }}
          />
        </BaseCrud.Modal>
      )}
    </>
  );
};

export default Assignments;
