// File: src/components/ui/PassengerViewModal.jsx
import React from 'react';
import { X, Phone, Mail, Wallet, Star } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const PassengerViewModal = ({ isOpen, onClose, passenger }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !passenger) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={cn(
          'rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto',
          palette.card,
          palette.border
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-xl font-semibold', palette.text)}>
            Passenger Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Avatar and Name */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                palette.avatarBg,
                'text-white text-2xl font-semibold'
              )}
            >
              {passenger.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            {/* <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                {passenger.name}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>
                ID: {passenger.id}
              </p>
            </div> */}
          </div>

          {/* Contact Information */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  {passenger.phone}
                </span>
              </div>
              {passenger.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm', palette.text)}>
                    {passenger.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Wallet and Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <div className="flex items-center gap-2 mb-1">
                <Wallet size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm font-medium', palette.text)}>
                  Wallet Balance
                </span>
              </div>
              <p className={cn('text-lg font-semibold', 'text-green-600')}>
                Birr {parseFloat(passenger.wallet || 0).toFixed(2)}
              </p>
            </div>

            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm font-medium', palette.text)}>
                  Rating
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={cn('text-lg font-semibold', 'text-yellow-600')}
                >
                  {passenger.rating || 0}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(passenger.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={cn('text-xs ml-1', palette.mutedText)}>
                  ({passenger.ratingCount || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Status and Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('text-sm font-medium mb-2', palette.text)}>
                Status
              </h4>
              <span
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  passenger.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : passenger.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                )}
              >
                {passenger.status || 'unknown'}
              </span>
            </div>

            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('text-sm font-medium mb-2', palette.text)}>
                Reward Points
              </h4>
              <p className={cn('text-lg font-semibold', 'text-blue-600')}>
                {passenger.rewardPoints || 0}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Additional Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Emergency Contacts:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {passenger.emergencyContacts ? 'Available' : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Contract ID:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {passenger.contractId || 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Join Date:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {passenger.createdAt
                    ? new Date(passenger.createdAt).toLocaleDateString()
                    : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className={cn('px-4 py-2 rounded-md', palette.btnPrimary)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerViewModal;
