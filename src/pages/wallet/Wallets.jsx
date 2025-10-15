// src/pages/Wallets.jsx
import React from 'react';
import BaseCrud from '../../components/crud/BaseCrud';
import useCrud from '../../hooks/useCrud';
import { WalletApi } from '../../services/walletApi.js';
import WalletViewModal from './WalletViewModal';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';

// Stable transformData function
const transformWallets = (response) => response.items || [];

const Wallets = () => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  // Disable create/edit/delete for wallets
  const crud = useCrud(WalletApi, {}, { transformData: transformWallets });

  const columns = [
    // {
    //   key: 'id',
    //   title: 'User ID',
    //   render: (w) => <p className={cn(palette.text)}>{w.id}</p>,
    // },
    {
      key: 'name',
      title: 'Name',
      render: (w) => <p className={cn(palette.text)}>{w.name}</p>,
    },
    {
      key: 'role',
      title: 'Role',
      render: (w) => <p className={cn(palette.text)}>{w.role}</p>,
    },
    {
      key: 'phone',
      title: 'Phone',
      render: (w) => <p className={cn(palette.text)}>{w.phone}</p>,
    },
    {
      key: 'email',
      title: 'Email',
      render: (w) => <p className={cn(palette.text)}>{w.email}</p>,
    },
    // {
    //   key: 'balance',
    //   title: 'Balance',
    //   render: (w) => (
    //     <p className={cn(palette.text)}>
    //       {Number(w.balance).toFixed(2)} {w.currency}
    //     </p>
    //   ),
    // },
    // {
    //   key: 'totalEarnings',
    //   title: 'Total Earnings',
    //   render: (w) => (
    //     <p className={cn(palette.text)}>
    //       {Number(w.totalEarnings).toFixed(2)} {w.currency}
    //     </p>
    //   ),
    // },
  ];

  return (
    <>
      <BaseCrud
        title="Wallets"
        description="Manage driver & user wallets"
        columns={columns}
        filteredData={crud.filteredData}
        isLoading={crud.isLoading}
        searchQuery={crud.searchQuery}
        onSearchChange={(e) => crud.handleSearch(e.target.value)}
        allowAdd={false}
        onView={crud.handleView}
        isModalOpen={crud.mode === 'view' && crud.isModalOpen}
        onModalClose={crud.handleCloseModal}
        palette={palette}
        hideAdd
        hideDelete
        hideEdit
      />
      {/* Modal to view wallet details */}
      <WalletViewModal
        isOpen={crud.mode === 'view' && crud.isModalOpen}
        onClose={crud.handleCloseModal}
        wallet={crud.selectedEntity}
      />
    </>
  );
};

export default Wallets;
