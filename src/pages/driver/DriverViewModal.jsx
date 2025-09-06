// File: src/components/ui/DriverViewModal.jsx
import React from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  Car,
  Star,
  MapPin,
  Wallet,
  Shield,
  FileText,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const DriverViewModal = ({ isOpen, onClose, driver }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !driver) return null;

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
            Driver Details
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
              {driver.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                {driver.name}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>
                ID: {driver.id}
              </p>
            </div>
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
                  {driver.phone}
                </span>
              </div>
              {driver.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm', palette.text)}>
                    {driver.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Vehicle Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Car size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm font-medium', palette.text)}>
                    Plate
                  </span>
                </div>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carPlate || 'Not set'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Car size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm font-medium', palette.text)}>
                    Model
                  </span>
                </div>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carModel || 'Not set'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Car size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm font-medium', palette.text)}>
                    Color
                  </span>
                </div>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carColor || 'Not set'}
                </p>
              </div>
            </div>
          </div>

          {/* Status and Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('text-sm font-medium mb-2', palette.text)}>
                Status
              </h4>
              <span
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  driver.status === 'online'
                    ? 'bg-green-100 text-green-800'
                    : driver.status === 'busy'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                )}
              >
                {driver.status || 'unknown'}
              </span>
            </div>

            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('text-sm font-medium mb-2', palette.text)}>
                Rating
              </h4>
              <div className="flex items-center gap-1">
                <span
                  className={cn('text-lg font-semibold', 'text-yellow-600')}
                >
                  {driver.rating || 0}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(driver.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={cn('text-xs ml-1', palette.mutedText)}>
                  ({driver.ratingCount || 0})
                </span>
              </div>
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
                  Wallet Balance:
                </span>
                <span className={cn('text-sm font-medium', 'text-green-600')}>
                  Birr {parseFloat(driver.wallet || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Reward Points:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {driver.rewardPoints || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Verification:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {driver.verification ? 'Verified' : 'Not Verified'}
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

export default DriverViewModal;
