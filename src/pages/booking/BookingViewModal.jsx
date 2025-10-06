// src/pages/booking/BookingViewModal.jsx
import React from 'react';
import {
  User,
  Car,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Booking Details"
      palette={palette}
    >
      <div className="space-y-4">
        {/* Booking ID and Status */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h3 className={cn('text-lg font-semibold', palette.text)}>
              Booking ID: {booking.id}
            </h3>
            <p className={cn('text-sm', palette.mutedText)}>
              Created: {new Date(booking.createdAt).toLocaleString()}
            </p>
            <p className={cn('text-sm', palette.mutedText)}>
              Last Updated: {new Date(booking.updatedAt).toLocaleString()}
            </p> */}
            <p className={cn('text-lg font-semibold', palette.mutedText)}>
              Status
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(booking.status)}
            <span className={cn('text-sm font-medium', palette.text)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Passenger and Driver */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>Participants</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Passenger: {booking.passenger?.name || 'N/A'} (
                {booking.passenger?.phone || 'N/A'})
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
                Pickup: {booking.pickup?.address || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Dropoff: {booking.dropoff?.address || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Distance: {booking.distanceKm?.toFixed(2) || 'N/A'} km
              </span>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-2', palette.text)}>
            Fare Breakdown
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={cn('text-sm', palette.mutedText)}>
                Estimated Fare:
              </span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.fareEstimated?.toFixed(2) || 'N/A'} Birr
              </span>
            </div>
            {/* New: Fare Breakdown Details */}
            <div className="flex justify-between">
              <span className={cn('text-sm', palette.mutedText)}>Base:</span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.fareBreakdown?.base?.toFixed(2) || 'N/A'} Birr
              </span>
            </div>
            <div className="flex justify-between">
              <span className={cn('text-sm', palette.mutedText)}>
                Distance Cost:
              </span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.fareBreakdown?.distanceCost?.toFixed(2) || 'N/A'} Birr
              </span>
            </div>
            <div className="flex justify-between">
              <span className={cn('text-sm', palette.mutedText)}>
                Time Cost:
              </span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.fareBreakdown?.timeCost?.toFixed(2) || 'N/A'} Birr
              </span>
            </div>
            <div className="flex justify-between">
              <span className={cn('text-sm', palette.mutedText)}>
                Surge Multiplier:
              </span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {booking.fareBreakdown?.surgeMultiplier || 'N/A'}x
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
    </Modal>
  );
};

export default BookingViewModal;
