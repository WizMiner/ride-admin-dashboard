// File: src/pages/Subscriptions.jsx
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import { cn } from '../../common/utils.js';
import BaseCrud from '../../components/crud/BaseCrud.jsx';
import useCrud from '../../hooks/useCrud.js';
import { subscriptionApi } from '../../services/contractApi.js';
import { useToast } from '../../hooks/useToast.jsx';
import { UserPlus, CheckCircle, XCircle } from 'lucide-react';
import Tooltip from '../../components/ui/Tooltip';
import Modal from '../../components/ui/Modal';
import SubscriptionViewModal from './SubscriptionViewModal.jsx';
import SubscriptionAssignDriverForm from './SubscriptionAssignDriverForm.jsx';

const transformSubscriptions = (response) => {
  const data = response?.data;
  const list = data?.subscriptions || [];

  list.__meta = { counters: data?.counters || {} };
  return list;
};

const Subscriptions = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const crud = useCrud(
    subscriptionApi,
    {},
    { transformData: transformSubscriptions }
  );
  const { addToast } = useToast();

  const counters = crud.data?.__meta?.counters || {};
  const totalSubscriptions = counters.total_count || 0;
  const activeSubscriptions = counters.active_count || 0;
  const pendingSubscriptions = counters.pending_count || 0;
  const expiredSubscriptions = counters.expired_count || 0;

  // Assign modal state
  const [assignModal, setAssignModal] = useState({
    open: false,
    subscription: null,
  });

  const columns = [
    {
      key: 'passenger_name',
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
              {item.passenger_name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'P'}
            </span>
          </div>
          <div>
            <p className={cn('font-medium', palette.text)}>
              {item.passenger_name || 'Unknown'}
            </p>
            <p className={cn('text-sm', palette.mutedText)}>
              {item.passenger_phone || 'No phone'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'driver_name',
      title: 'Driver',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.driver_name || 'Unassigned'}
        </p>
      ),
    },
    {
      key: 'route',
      title: 'Route',
      render: (item) => (
        <p className={cn('text-sm', palette.text)}>
          {item.pickup_location} to {item.dropoff_location}
        </p>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => (
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium uppercase',
            item.status === 'ACTIVE'
              ? 'bg-green-100 text-green-800'
              : item.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800'
                : item.status === 'CANCELED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
          )}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'final_fare',
      title: 'Fare',
      render: (item) => (
        <p className={cn('text-sm font-medium', palette.text)}>
          {Number(item.final_fare ?? 0).toFixed(2)} Birr{' '}
          {/* FIX applied here */}
        </p>
      ),
    },
    {
      key: 'expiration_date',
      title: 'Expires',
      render: (item) => (
        <p
          className={cn(
            'text-sm',
            item.is_expired ? 'text-red-500' : palette.text
          )}
        >
          {item.is_expired
            ? 'Expired'
            : new Date(item.expiration_date).toLocaleDateString()}
        </p>
      ),
    },
    {
      key: 'actions',
      //   title: 'Assign',
      render: (s) => (
        <div className="flex space-x-2">
          {/* Assign Driver Button (if not assigned) */}
          {s.status !== 'CANCELED' && !s.driver_id && (
            <Tooltip content="Assign Driver">
              <button
                className={cn(
                  'p-2 rounded-full transition-colors',
                  palette.btnPrimary
                )}
                onClick={() => setAssignModal({ open: true, subscription: s })}
              >
                <UserPlus size={18} />
              </button>
            </Tooltip>
          )}

          {/* Approve Button */}
          {s.status === 'PENDING' && (
            <Tooltip content="Approve Subscription">
              <button
                className={cn(
                  'p-2 rounded-full transition-colors',
                  palette.btnSuccess,
                  crud.actionLoading === s.id && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => handleApprove(s.id)}
                disabled={crud.actionLoading === s.id}
              >
                <CheckCircle size={18} />
              </button>
            </Tooltip>
          )}

          {/* Cancel Button (Status Change) */}
          {/* {s.status !== 'CANCELED' && s.status !== 'EXPIRED' && (
            <Tooltip content="Cancel Subscription">
              <button
                className={cn(
                  'p-2 rounded-full transition-colors',
                  palette.btnDanger
                )}
                onClick={() => handleStatusChange(s.id, 'CANCELED')}
              >
                <XCircle size={18} />
              </button>
            </Tooltip>
          )} */}
        </div>
      ),
    },
  ];

  const handleApprove = async (id) => {
    crud.setActionLoading(id);
    try {
      await subscriptionApi.approve(id);
      addToast('Subscription approved successfully!', 'success');
      await crud.loadData();
    } catch (err) {
      addToast(err?.message || 'Failed to approve subscription.', 'error');
    } finally {
      crud.setActionLoading(false);
    }
  };

  //   const handleStatusChange = async (id, status) => {
  //     crud.setActionLoading(id);
  //     try {
  //       await subscriptionApi.status(id, { status });
  //       addToast(`Subscription status changed to ${status}!`, 'success');
  //       await crud.loadData();
  //     } catch (err) {
  //       addToast(
  //         err?.message || `Failed to change status to ${status}.`,
  //         'error'
  //       );
  //     } finally {
  //       crud.setActionLoading(false);
  //     }
  //   };

  const handleDeleteWithToast = async () => {
    try {
      await crud.handleDeleteConfirm(subscriptionApi.delete);
      addToast('Subscription deleted successfully!', 'success');
    } catch (err) {
      addToast(err?.message || 'An unexpected error occurred.', 'error');
    }
  };

  const renderStats = () => (
    <>
      {[
        { label: 'Total', value: totalSubscriptions, color: palette.text },
        {
          label: 'Active',
          value: activeSubscriptions,
          color: 'text-green-600',
        },
        {
          label: 'Pending',
          value: pendingSubscriptions,
          color: 'text-yellow-600',
        },
        {
          label: 'Expired',
          value: expiredSubscriptions,
          color: 'text-red-600',
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
          <div>
            <p className={cn('text-sm', palette.mutedText)}>{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
          </div>
        </div>
      ))}
    </>
  );

  const renderFilters = () => (
    <select
      value={crud.filters.status || 'all'}
      onChange={(e) => crud.handleFilter('status', e.target.value)}
      className={cn(
        'px-4 py-2 rounded-md border',
        palette.border,
        palette.card,
        palette.text
      )}
    >
      <option value="all">All Status</option>
      <option value="ACTIVE">Active</option>
      <option value="PENDING">Pending</option>
      <option value="CANCELED">Canceled</option>
      <option value="EXPIRED">Expired</option>
    </select>
  );

  return (
    <>
      <BaseCrud
        title="Subscriptions"
        description="Manage passenger contract subscriptions"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        onAdd={null}
        onEdit={null}
        onView={crud.handleView}
        allowAdd={false}
        onDelete={crud.handleDelete}
        isModalOpen={crud.isModalOpen && crud.mode === 'view'}
        onModalClose={crud.handleCloseModal}
        isAlertOpen={crud.isAlertOpen}
        onAlertClose={crud.handleCloseAlert}
        onAlertConfirm={handleDeleteWithToast}
        entityToDelete={crud.entityToDelete}
        actionLoading={crud.actionLoading}
        renderStats={renderStats}
        renderFilters={renderFilters}
        palette={palette}
      />

      {/* View modal */}
      <SubscriptionViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        subscription={crud.selectedEntity}
        palette={palette}
      />

      {/* Assign Driver Modal */}
      {assignModal.open && (
        <Modal
          isOpen={assignModal.open}
          onClose={() => setAssignModal({ open: false, subscription: null })}
          title={`Assign Driver to: ${assignModal.subscription?.passenger_name}`}
          palette={palette}
        >
          <SubscriptionAssignDriverForm
            entity={assignModal.subscription}
            onCancel={() => setAssignModal({ open: false, subscription: null })}
            onSubmit={async (data) => {
              crud.setActionLoading(true);
              try {
                const subscriptionId = assignModal.subscription?.id;
                await subscriptionApi.assign(subscriptionId, data);
                addToast('Driver assigned successfully', 'success');
                setAssignModal({ open: false, subscription: null });
                await crud.loadData();
              } catch (err) {
                addToast(err?.message || 'Failed to assign driver', 'error');
              } finally {
                crud.setActionLoading(false);
              }
            }}
            loading={crud.actionLoading}
            palette={palette}
          />
        </Modal>
      )}
    </>
  );
};

export default Subscriptions;
