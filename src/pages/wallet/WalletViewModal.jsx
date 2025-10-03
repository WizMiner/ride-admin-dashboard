import React from 'react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { User, Calendar, RefreshCw, Wallet } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const WalletViewModal = ({ isOpen, onClose, wallet }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !wallet) return null;

  //   const formatDate = (dateString) =>
  //     dateString ? new Date(dateString).toLocaleString() : 'N/A';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wallet Details"
      palette={palette}
    >
      <div className="space-y-6">
        {/* Wallet Info Card (Updated to use theme palette and grid) */}
        <div
          className={cn(
            'flex items-start gap-4 p-4 rounded-lg shadow-sm',
            palette.primaryLightBg, // Use primary light background for emphasis
            palette.border
          )}
        >
          <div
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-100 dark:bg-primary-900/20'
            )}
          >
            {/* Wallet icon using theme's icon text color */}
            <User size={24} className={cn(palette.iconText)} />
          </div>

          <div className="flex-grow grid grid-cols-2 gap-y-3 gap-x-4">
            {/* User ID */}
            <div>
              <h4
                className={cn(
                  'text-xs font-semibold uppercase',
                  palette.mutedText
                )}
              >
                User ID
              </h4>
              <p className={cn('text-sm font-medium', palette.text)}>
                {wallet.userId}
              </p>
            </div>

            {/* Role */}
            <div>
              <h4
                className={cn(
                  'text-xs font-semibold uppercase',
                  palette.mutedText
                )}
              >
                Role
              </h4>
              <p className={cn('text-sm font-medium', palette.text)}>
                {wallet.role}
              </p>
            </div>

            {/* Balance */}
            <div className="col-span-2">
              <h4
                className={cn(
                  'text-xs font-semibold uppercase',
                  palette.mutedText
                )}
              >
                Current Balance
              </h4>
              <div className="flex items-center gap-1">
                <Wallet size={16} className={cn(palette.iconText)} />
                <p className={cn('text-lg font-bold', palette.text)}>
                  {Number(wallet.balance).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Card */}
        {/* <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4
            className={cn(
              'font-semibold mb-3 border-b pb-2',
              palette.text,
              palette.border
            )}
          >
            Metadata
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar
                size={16}
                className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Created At
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {formatDate(wallet.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <RefreshCw
                size={16}
                className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Updated At
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {formatDate(wallet.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className={cn(
            'px-6 py-2 rounded-md font-medium transition-colors',
            palette.btnPrimary,
            'hover:opacity-90'
          )}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default WalletViewModal;
