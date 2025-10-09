// File: src/pages/passenger/Passengers.jsx
import React from 'react';
import { MapPin, Phone, Mail, Wallet, Star, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import BaseCrud from '../../components/crud/BaseCrud';
import GenericViewModal from '../../components/crud/GenericViewModal';
import useCrud from '../../hooks/useCrud';
import { passengerApi } from '../../services/passengerApi';
import PassengerForm from './PassengerForm';
import { useToast } from '../../hooks/useToast';

const Passengers = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(passengerApi, { status: 'all' });
  const { addToast } = useToast();

  // Calculate stats
  const totalPassengers = crud.data.length;
  // const activePassengers = crud.data.filter(
  //   (p) => p.status === 'active'
  // ).length;
  // const inactivePassengers = crud.data.filter(
  //   (p) => p.status === 'inactive'
  // ).length;
  const averageRating =
    crud.data.reduce((sum, p) => sum + (p.rating || 0), 0) /
    (crud.data.length || 1);

  const columns = [
    {
      key: 'name',
      title: 'Passenger',
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
                .join('') || 'P'}
            </span>
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.name || 'Unknown'}
            </p>
            {/* <p className={cn('text-sm', palette.mutedText)}>ID: {item.id}</p> */}
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (item) => (
        <div>
          <p className={cn('text-sm', palette.text)}>
            {item.email || 'No email'}
          </p>
          <p className={cn('text-sm', palette.mutedText)}>{item.phone}</p>
        </div>
      ),
    },
    // {
    //   key: 'status',
    //   title: 'Status',
    //   render: (item) => {
    //     const status = item.status || 'unknown';
    //     const statusColor =
    //       status === 'active'
    //         ? 'bg-green-100 text-green-800'
    //         : status === 'inactive'
    //           ? 'bg-red-100 text-red-800'
    //           : 'bg-gray-100 text-gray-800';

    //     return (
    //       <span
    //         className={cn(
    //           'px-2 py-1 rounded-full text-xs font-medium',
    //           statusColor
    //         )}
    //       >
    //         {status}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   key: 'wallet',
    //   title: 'Wallet Balance',
    //   render: (item) => `Birr ${parseFloat(item.wallet || 0).toFixed(2)}`,
    // },
    {
      key: 'rating',
      title: 'Rating',
      render: (item) => (
        <div className="flex items-center gap-1">
          <span className={cn('text-sm font-medium', palette.text)}>
            {item.rating || 0}
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(item.rating || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className={cn('text-xs', palette.mutedText)}>
            ({item.ratingCount || 0})
          </span>
        </div>
      ),
    },
  ];

  const viewModalSections = [
    {
      title: 'Personal Information',
      fields: [
        { key: 'name', label: 'Name' },
        {
          key: 'phone',
          label: 'Phone',
          render: (value) => value || 'Not provided',
        },
        {
          key: 'email',
          label: 'Email',
          render: (value) => value || 'Not provided',
        },
      ],
    },
    {
      title: 'Account Details',
      fields: [
        // {
        //   key: 'status',
        //   label: 'Status',
        //   render: (value) => value || 'unknown',
        // },
        // {
        //   key: 'wallet',
        //   label: 'Wallet Balance',
        //   render: (value) => `Birr ${parseFloat(value || 0).toFixed(2)}`,
        // },
        {
          key: 'rating',
          label: 'Rating',
          render: (value) => `${value || 0}/5`,
        },
        {
          key: 'rewardPoints',
          label: 'Reward Points',
          render: (value) => value || 0,
        },
      ],
    },
    {
      title: 'Additional Information',
      fields: [
        {
          key: 'emergencyContacts',
          label: 'Emergency Contacts',
          render: (value) => (value ? 'Available' : 'Not set'),
        },
        {
          key: 'contractId',
          label: 'Contract ID',
          render: (value) => value || 'None',
        },
      ],
    },
  ];

  const renderStats = () => (
    <>
      <div
        className={cn('rounded-lg p-4 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-sm', palette.mutedText)}>Total Passengers</p>
            <p className={cn('text-2xl font-bold', palette.text)}>
              {totalPassengers}
            </p>
          </div>
          <div
            className={cn(
              'p-2 rounded-lg',
              palette.primaryLightBg,
              palette.iconText
            )}
          >
            <User size={20} />
          </div>
        </div>
      </div>

      {/* <div
        className={cn('rounded-lg p-4 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-sm', palette.mutedText)}>Active</p>
            <p className={cn('text-2xl font-bold', 'text-green-600')}>
              {activePassengers}
            </p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>

      <div
        className={cn('rounded-lg p-4 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-sm', palette.mutedText)}>Inactive</p>
            <p className={cn('text-2xl font-bold', 'text-red-600')}>
              {inactivePassengers}
            </p>
          </div>
          <div className="w-3 h-3 bg-red-500 rounded-full" />
        </div>
      </div> */}

      <div
        className={cn('rounded-lg p-4 shadow-sm', palette.card, palette.border)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-sm', palette.mutedText)}>Avg Rating</p>
            <p className={cn('text-2xl font-bold', 'text-yellow-600')}>
              {averageRating.toFixed(1)}
            </p>
          </div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        </div>
      </div>
    </>
  );

  // const renderFilters = () => (
  //   <select
  //     value={crud.filters.status}
  //     onChange={(e) => crud.handleFilter('status', e.target.value)}
  //     className={cn(
  //       'px-4 py-2 rounded-md border',
  //       palette.border,
  //       palette.card,
  //       palette.text
  //     )}
  //   >
  //     <option value="all">All Status</option>
  //     <option value="active">Active</option>
  //     <option value="inactive">Inactive</option>
  //   </select>
  // );

  const handleSaveWithToast = async (entity) => {
    try {
      await crud.handleSave(entity);
      const message = `Passenger ${crud.mode === 'edit' ? 'updated' : 'created'} successfully!`;
      addToast(message, 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm();
      addToast('Passenger deleted successfully!', 'success');
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred.';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <BaseCrud
        title="Passengers"
        description="Manage and monitor passenger accounts"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        onAdd={crud.handleAdd}
        // onEdit={crud.handleEdit}
        onView={crud.handleView}
        onDelete={crud.handleDelete}
        isModalOpen={
          crud.isModalOpen && (crud.mode === 'add' || crud.mode === 'edit')
        }
        onModalClose={crud.handleCloseModal}
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteWithToast}
        entityToDelete={crud.entityToDelete}
        actionLoading={crud.actionLoading}
        modalTitle={
          crud.mode === 'edit'
            ? 'Edit Passenger'
            : crud.mode === 'add'
              ? 'Add Passenger'
              : ''
        }
        renderStats={renderStats}
        // renderFilters={renderFilters}
        renderForm={() => (
          <PassengerForm
            initialData={crud.selectedEntity}
            onSubmit={handleSaveWithToast}
            onCancel={crud.handleCloseModal}
            loading={crud.actionLoading}
            palette={palette}
          />
        )}
        palette={palette}
      />

      <GenericViewModal
        isOpen={crud.mode === 'view'}
        onClose={() => crud.handleView(null)}
        title="Passenger"
        entity={crud.selectedEntity}
        sections={viewModalSections}
        palette={palette}
      />
    </>
  );
};

export default Passengers;
