import React from 'react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { User, Phone, Mail, DollarSign, Wallet } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const WalletViewModal = ({ isOpen, onClose, wallet }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !wallet) return null;

  const {
    // id,
    name,
    phone,
    email,
    role,
    balance,
    totalEarnings,
    currency,
  } = wallet;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Wallet Details: ${name || 'N/A'}`}
      palette={palette}
    >
      <div className="space-y-6">
        {/* === User/Wallet Summary Card === */}
        <div
          className={cn(
            'flex items-start gap-4 p-4 rounded-lg shadow-sm',
            palette.primaryLightBg,
            palette.border
          )}
        >
          <div
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-100 dark:bg-primary-900/20'
            )}
          >
            {/* User icon */}
            <User size={24} className={cn(palette.iconText)} />
          </div>

          <div className="flex-grow grid grid-cols-2 gap-y-3 gap-x-4">
            {/* Name */}
            <div className="col-span-2">
              <h4
                className={cn(
                  'text-xs font-semibold uppercase',
                  palette.mutedText
                )}
              >
                Account Holder
              </h4>
              <p className={cn('text-lg font-bold', palette.text)}>
                {name || 'N/A'}
              </p>
            </div>

            {/* User ID */}
            {/* <div>
              <h4
                className={cn(
                  'text-xs font-semibold uppercase',
                  palette.mutedText
                )}
              >
                User ID
              </h4>
              <div className="flex items-center gap-1">
                <Hash size={14} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium', palette.text)}>
                  {id || 'N/A'}
                </p>
              </div>
            </div> */}

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
                {role || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* === Contact and Financial Details === */}
        <div className={cn('space-y-4 p-4 rounded-lg border', palette.border)}>
          <h4 className={cn('font-semibold text-base', palette.text)}>
            Financial & Contact Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Balance */}
            <div className="flex items-start gap-2">
              <Wallet
                size={16}
                className={cn(palette.iconText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Current Balance
                </p>
                <p className={cn('text-sm font-semibold', palette.text)}>
                  {Number(balance).toFixed(2)} {currency || 'ETB'}
                </p>
              </div>
            </div>

            {/* Total Earnings (Assuming this is a key financial metric) */}
            <div className="flex items-start gap-2">
              <DollarSign
                size={16}
                className={cn('text-green-500', 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Total Earnings
                </p>
                <p className={cn('text-sm font-semibold', palette.text)}>
                  {Number(totalEarnings).toFixed(2)} {currency || 'ETB'}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2">
              <Phone
                size={16}
                className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Phone
                </p>
                <p className={cn('text-sm', palette.text)}>{phone || 'N/A'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2">
              <Mail
                size={16}
                className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Email
                </p>
                <p className={cn('text-sm', palette.text)}>{email || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
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
