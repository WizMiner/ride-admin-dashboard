// src/pages/booking/BookingViewModal.jsx
import React from 'react';
import {
  X,
  User,
  Car,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const BookingViewModal = ({ isOpen, onClose, booking }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !booking) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'canceled':
        return <XCircle size={16} className="text-red-500" />;
      case 'requested':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'accepted':
        return <CheckCircle size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

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
            Booking Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Booking ID and Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                Booking ID: {booking._id}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>
                Created: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(booking.status)}
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Passenger and Driver */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Participants
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Passenger ID: {booking.passengerId}
                </span>
              </div>
              {booking.driverId && (
                <div className="flex items-center gap-2">
                  <User size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm', palette.text)}>
                    Driver ID: {booking.driverId}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Car size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Vehicle: {booking.vehicleType}
                </span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>Locations</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Pickup: {booking.pickup.latitude}, {booking.pickup.longitude}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Dropoff: {booking.dropoff.latitude},{' '}
                  {booking.dropoff.longitude}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Distance: {booking.distanceKm.toFixed(2)} km
                </span>
              </div>
            </div>
          </div>

          {/* Fare */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-2', palette.text)}>
              Fare Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Estimated:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {booking.fareEstimated.toFixed(2)} Birr
                </span>
              </div>
              {booking.fareFinal > 0 && (
                <div className="flex justify-between">
                  <span className={cn('text-sm', palette.mutedText)}>
                    Final:
                  </span>
                  <span className={cn('text-sm font-medium', palette.text)}>
                    ${booking.fareFinal.toFixed(2)}
                  </span>
                </div>
              )}
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

export default BookingViewModal;
