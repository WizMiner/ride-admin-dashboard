// src/pages/live/LiveViewModal.jsx
import React from 'react';
import { X, User, MapPin, Activity } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const LiveViewModal = ({ isOpen, onClose, live }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !live) return null;

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
            Live Update Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Driver Info */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                palette.avatarBg,
                'text-white text-2xl font-semibold'
              )}
            >
              D
            </div>
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                Driver ID: {live.driverId}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>
                Trip ID: {live.tripId}
              </p>
            </div>
          </div>

          {/* Location and Status */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Current Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Location: {live.latitude}, {live.longitude}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Status: {live.status}
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

export default LiveViewModal;
