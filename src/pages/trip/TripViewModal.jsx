// src/pages/trip/TripViewModal.jsx
import React from 'react';
import { User, Clock, CheckCircle, Calendar, MapPin, Car } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal.jsx';

const TripViewModal = ({ isOpen, onClose, trip }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Trip Details"
      palette={palette}
    >
      <div className="space-y-4">
        {/* Trip ID and Status */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={cn('text-lg font-semibold', palette.mutedText)}>
              states
            </h3>
            {/* <h3 className={cn('text-lg font-semibold', palette.text)}>
              Trip ID: {trip.id || trip._id || 'N/A'}
            </h3>
            <p className={cn('text-sm', palette.mutedText)}>
              Created: {new Date(trip.createdAt).toLocaleString()}
            </p> */}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className={cn('text-sm font-medium', palette.text)}>
              {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Passenger Details */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>Passenger</h4>
          <div className="flex items-center gap-2">
            <User size={16} className={cn(palette.mutedText)} />
            <span className={cn('text-sm', palette.text)}>
              {trip.passenger?.name || `ID: ${trip.passengerId}`}
            </span>
          </div>
          <p className={cn('text-sm ml-6', palette.mutedText)}>
            {trip.passenger?.phone || 'No phone number'}
          </p>
        </div>

        {/* Driver Details */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>Driver</h4>
          <div className="flex items-center gap-2">
            <User size={16} className={cn(palette.mutedText)} />
            <span className={cn('text-sm', palette.text)}>
              {trip.driver?.name || `ID: ${trip.driverId}`}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Car size={16} className={cn(palette.mutedText)} />
            <span className={cn('text-sm', palette.text)}>
              {trip.vehicle?.make || 'N/A'} {trip.vehicle?.model || 'N/A'}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>
            Route & Booking
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin size={16} className={cn('text-green-500')} />
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Pickup
                </p>
                <p className={cn('text-sm', palette.mutedText)}>
                  {trip.booking?.pickup?.address || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className={cn('text-red-500')} />
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Dropoff
                </p>
                <p className={cn('text-sm', palette.mutedText)}>
                  {trip.booking?.dropoff?.address || 'N/A'}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-2 mt-2">
              <Clock size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Booking ID: {trip.bookingId}
              </span>
            </div> */}
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

export default TripViewModal;
