// src/pages/booking/BookingViewModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Car,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';
import LocationMap from '../../components/maps/LocationMap';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { useSocket } from '../../hooks/useSocket'; // ← Fixed: Import from hooks, not context
import { useSocketEvents } from '../../hooks/useSocketEvents';
import Spinner from '../../components/ui/Spinner';

const BookingViewModal = ({ isOpen, onClose, booking }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);
  const { isLoaded: mapsLoaded } = useGoogleMaps();
  const { socket, joinRoom, leaveRoom, isJoiningRoom, isConnected } =
    useSocket();
  const [liveLocation, setLiveLocation] = useState(null);
  const [eta, setEta] = useState(null);
  const [currentPricing, setCurrentPricing] = useState(
    booking?.fareEstimated || 0
  );
  const [isRequestingStatus, setIsRequestingStatus] = useState(false);
  const roomJoinedRef = useRef(false);

  // Emit status request on open for fresh snapshot
  useEffect(() => {
    if (isOpen && booking?.id && socket) {
      setIsRequestingStatus(true);
      socket.emit('booking:status_request', { bookingId: booking.id });
    }

    return () => {
      setIsRequestingStatus(false);
    };
  }, [isOpen, booking?.id, socket]);

  // Join booking room for live updates
  useEffect(() => {
    if (isOpen && booking?.id && !roomJoinedRef.current && isConnected) {
      joinRoom(`booking:${booking.id}`).then((success) => {
        if (success) {
          roomJoinedRef.current = true;
        }
      });
    }

    return () => {
      if (roomJoinedRef.current && booking?.id) {
        leaveRoom(`booking:${booking.id}`);
        roomJoinedRef.current = false;
      }
    };
  }, [isOpen, booking?.id, joinRoom, leaveRoom, isConnected]);

  // Listen to live events for this booking
  useSocketEvents({}, (eventType, payload) => {
    if (payload.bookingId !== booking.id) return;
    switch (eventType) {
      case 'bookingUpdate':
        // Status snapshot received; booking prop will update via parent crud
        console.log('Status snapshot:', payload);
        setIsRequestingStatus(false);
        break;
      case 'driverLocation':
        setLiveLocation(payload);
        break;
      case 'etaUpdate':
        setEta(payload.etaMinutes);
        break;
      case 'pricingUpdate':
        setCurrentPricing(payload.fareEstimated || payload.total);
        break;
      default:
        break;
    }
  });

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

  const driverPos = liveLocation
    ? {
        lat: liveLocation.latitude,
        lng: liveLocation.longitude,
      }
    : null;

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

        {/* Live Map for Tracking */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={cn('font-medium', palette.text)}>Live Tracking</h4>
            <div
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded text-xs',
                isConnected
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              )}
            >
              {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isConnected ? 'Live' : 'Offline'}
            </div>
          </div>
          {mapsLoaded ? (
            <LocationMap
              pickup={{
                lat: parseFloat(booking.pickup?.latitude),
                lng: parseFloat(booking.pickup?.longitude),
              }}
              dropoff={{
                lat: parseFloat(booking.dropoff?.latitude),
                lng: parseFloat(booking.dropoff?.longitude),
              }}
              currentDriver={driverPos}
              palette={palette}
            />
          ) : (
            <div
              className={cn(
                'h-64 flex items-center justify-center',
                palette.card
              )}
            >
              <Spinner size="small" />
              <span className={cn('ml-2', palette.mutedText)}>
                Loading map...
              </span>
            </div>
          )}
          {isJoiningRoom && (
            <p className={cn('text-sm', palette.mutedText)}>
              Joining live updates...
            </p>
          )}
          {isRequestingStatus && (
            <p className={cn('text-sm', palette.mutedText)}>
              Fetching live status...
            </p>
          )}
          {eta && (
            <p className={cn('text-sm font-medium', palette.text)}>
              ETA: {eta} minutes
            </p>
          )}
        </div>

        {/* Participants */}
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
                Current Fare:
              </span>
              <span className={cn('text-sm font-medium', palette.text)}>
                {currentPricing?.toFixed(2) || 'N/A'} Birr
              </span>
            </div>
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
