// src/pages/trip/TripViewModal.jsx
import React from 'react';
import { X, User, Clock, CheckCircle, Calendar } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const TripViewModal = ({ isOpen, onClose, trip }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !trip) return null;

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
            Trip Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Trip ID and Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                Trip ID: {trip._id}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>
                Created: {new Date(trip.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className={cn('text-sm font-medium', palette.text)}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Participants */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Participants
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Passenger ID: {trip.passengerId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Driver ID: {trip.driverId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Travel Date: {new Date(trip.dateOfTravel).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Reference */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Booking Reference
            </h4>
            <div className="flex items-center gap-2">
              <Clock size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Booking ID: {trip.bookingId}
              </span>
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

export default TripViewModal;
