// File: src/pages/SubscriptionViewModal.jsx
import React, { useMemo } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Car,
} from 'lucide-react';
import { cn } from '../../common/utils';
import GenericViewModal from '../../components/crud/GenericViewModal';

const SubscriptionViewModal = ({ isOpen, onClose, subscription, palette }) => {
  const entity = subscription;

  const viewModalSections = useMemo(() => {
    if (!entity) return [];

    const generalDetails = [
      {
        key: 'status',
        label: 'Status',
        icon: <Clock size={16} />,
        render: (value) => (
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium uppercase',
              value === 'ACTIVE'
                ? 'bg-green-100 text-green-800'
                : value === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : value === 'CANCELED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
            )}
          >
            {value}
          </span>
        ),
      },
      {
        key: 'payment_status',
        label: 'Payment Status',
        icon: <DollarSign size={16} />,
        render: (value) => value || 'N/A',
      },
      {
        key: 'start_date',
        label: 'Start Date',
        icon: <Calendar size={16} />,
        render: (value) =>
          value ? new Date(value).toLocaleDateString() : 'N/A',
      },
      {
        key: 'end_date',
        label: 'End Date',
        icon: <Calendar size={16} />,
        render: (value) =>
          value ? new Date(value).toLocaleDateString() : 'N/A',
      },
      {
        key: 'distance_km',
        label: 'Daily Distance (km)',
        icon: <MapPin size={16} />,
        render: (value) => `${parseFloat(value || 0).toFixed(2)} km`,
      },
      {
        key: 'is_expired',
        label: 'Expired',
        icon: <Clock size={16} />,
        render: (value) =>
          value ? (
            <span className="text-red-500 font-medium">Yes</span>
          ) : (
            <span className="text-green-500 font-medium">No</span>
          ),
      },
    ];

    const passengerInfo = [
      { key: 'passenger_name', label: 'Name', icon: <User size={16} /> },
      { key: 'passenger_phone', label: 'Phone', icon: <Phone size={16} /> },
      { key: 'passenger_email', label: 'Email', icon: <Mail size={16} /> },
      {
        key: 'contract_id',
        label: 'Contract ID',
        icon: <Calendar size={16} />,
      },
    ];

    const driverInfo = [
      { key: 'driver_name', label: 'Driver Name', icon: <User size={16} /> },
      { key: 'driver_phone', label: 'Driver Phone', icon: <Phone size={16} /> },
      { key: 'driver_email', label: 'Driver Email', icon: <Mail size={16} /> },
      {
        key: 'vehicle_info',
        label: 'Vehicle',
        icon: <Car size={16} />,
        render: (value) =>
          value ? `${value.carPlate} (${value.carModel})` : 'Unassigned',
      },
    ];

    const fareDetails = [
      {
        key: 'fare',
        label: 'Base Fare',
        icon: <DollarSign size={16} />,
        render: (v) => `${parseFloat(v || 0).toFixed(2)} Birr`,
      },
      {
        key: 'discount_applied',
        label: 'Discount',
        icon: <DollarSign size={16} />,
        render: (v) => `${parseFloat(v || 0).toFixed(2)} Birr`,
      },
      {
        key: 'final_fare',
        label: 'Final Fare',
        icon: <DollarSign size={16} />,
        render: (v) => (
          <span className="font-bold text-lg text-green-600">
            {parseFloat(v || 0).toFixed(2)} Birr
          </span>
        ),
      },
    ];

    const locationInfo = [
      {
        key: 'pickup_location',
        label: 'Pickup Address',
        icon: <MapPin size={16} />,
      },
      {
        key: 'dropoff_location',
        label: 'Dropoff Address',
        icon: <MapPin size={16} />,
      },
      { key: 'pickup_latitude', label: 'P/U Lat', render: (v) => v || 'N/A' },
      { key: 'pickup_longitude', label: 'P/U Lng', render: (v) => v || 'N/A' },
      { key: 'dropoff_latitude', label: 'D/O Lat', render: (v) => v || 'N/A' },
      { key: 'dropoff_longitude', label: 'D/O Lng', render: (v) => v || 'N/A' },
    ];

    return [
      { title: 'Subscription Status', fields: generalDetails },
      { title: 'Passenger Information', fields: passengerInfo },
      { title: 'Driver Information', fields: driverInfo },
      { title: 'Location Details', fields: locationInfo },
      { title: 'Fare Breakdown', fields: fareDetails },
    ];
  }, [entity]);

  return (
    <GenericViewModal
      isOpen={isOpen}
      onClose={onClose}
      title="Subscription Details"
      entity={entity}
      sections={viewModalSections}
      palette={palette}
    />
  );
};

export default SubscriptionViewModal;
