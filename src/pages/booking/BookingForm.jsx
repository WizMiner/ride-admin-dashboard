// File: src/pages/booking/BookingForm.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { passengerApi } from '../../services/passengerApi';
import { Search, RotateCcw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const BookingForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isEditMode = useMemo(() => !!safeInitialData.id, [safeInitialData]);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    passengerId: safeInitialData.passengerId || '',
    vehicleType: safeInitialData.vehicleType || 'mini',
    pickupLatitude: safeInitialData.pickup?.latitude || '',
    pickupLongitude: safeInitialData.pickup?.longitude || '',
    pickupAddress: safeInitialData.pickup?.address || '',
    dropoffLatitude: safeInitialData.dropoff?.latitude || '',
    dropoffLongitude: safeInitialData.dropoff?.longitude || '',
    dropoffAddress: safeInitialData.dropoff?.address || '',
    status: safeInitialData.status || 'requested',
  });

  const [passengers, setPassengers] = useState([]);
  const [passengersLoading, setPassengersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchPassengers = async () => {
    setPassengersLoading(true);
    try {
      const data = await passengerApi.list();
      setPassengers(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error('Failed to fetch passengers:', err);
      addToast('Failed to load passengers. Please try again.', 'error');
      setPassengers([]);
    } finally {
      setPassengersLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      passengerId: safeInitialData.passengerId || '',
      vehicleType: safeInitialData.vehicleType || 'mini',
      pickupLatitude: safeInitialData.pickup?.latitude || '',
      pickupLongitude: safeInitialData.pickup?.longitude || '',
      pickupAddress: safeInitialData.pickup?.address || '',
      dropoffLatitude: safeInitialData.dropoff?.latitude || '',
      dropoffLongitude: safeInitialData.dropoff?.longitude || '',
      dropoffAddress: safeInitialData.dropoff?.address || '',
      status: safeInitialData.status || 'requested',
    });
  }, [safeInitialData]);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true);
    setFormData((prev) => ({ ...prev, passengerId: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      passengerId: formData.passengerId,
      vehicleType: formData.vehicleType,
      pickup: {
        latitude: parseFloat(formData.pickupLatitude),
        longitude: parseFloat(formData.pickupLongitude),
        address: formData.pickupAddress,
      },
      dropoff: {
        latitude: parseFloat(formData.dropoffLatitude),
        longitude: parseFloat(formData.dropoffLongitude),
        address: formData.dropoffAddress,
      },
      status: formData.status,
    };

    if (isEditMode) {
      payload.id = safeInitialData.id;
    }

    // FIX: The onSubmit prop should handle its own success toast.
    // The parent component calling BookingForm will handle success.
    try {
      await onSubmit(payload);
    } catch (err) {
      const errorMessage =
        err?.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} booking.`;
      addToast(errorMessage, 'error');
    }
  };

  const filteredPassengers = useMemo(() => {
    if (!Array.isArray(passengers)) {
      return [];
    }

    if (searchQuery.length === 0 && formData.passengerId !== '') {
      return [];
    }

    return passengers.filter((p) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const nameMatch = p.name?.toLowerCase().includes(lowerCaseQuery);
      const phoneMatch = p.phone?.includes(lowerCaseQuery);
      const emailMatch = p.email?.toLowerCase().includes(lowerCaseQuery);
      return nameMatch || phoneMatch || emailMatch;
    });
  }, [passengers, searchQuery, formData.passengerId]);

  const handleSelectPassenger = (p) => {
    setFormData((prev) => ({ ...prev, passengerId: p.id }));
    setSearchQuery(`${p.name} (${p.phone})`);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // FIX: Find selected passenger and initialize the search query when a new initialData is provided.
  useEffect(() => {
    const initialSelectedPassenger = passengers.find(
      (p) => p.id === safeInitialData.passengerId
    );
    if (initialSelectedPassenger) {
      setSearchQuery(
        `${initialSelectedPassenger.name} (${initialSelectedPassenger.phone})`
      );
    } else {
      setSearchQuery('');
    }
  }, [safeInitialData, passengers]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Passenger Search and Select Field */}
      <div className="relative" ref={dropdownRef}>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Passenger
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            className={cn(
              'w-full p-2 pr-10 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
            placeholder="Search by name, phone, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Search
            size={20}
            className={cn(
              'absolute right-9 top-1/2 -translate-y-1/2',
              palette.mutedText
            )}
          />
          <button
            type="button"
            onClick={fetchPassengers}
            disabled={passengersLoading}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full',
              palette.mutedText,
              passengersLoading && 'animate-spin'
            )}
            title="Refresh"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {passengersLoading ? (
          <div className={cn('mt-2 p-2 rounded', palette.card, palette.border)}>
            <div className="flex items-center space-x-2">
              <Spinner size="small" />
              <span className={cn('text-sm', palette.mutedText)}>
                Loading passengers...
              </span>
            </div>
          </div>
        ) : (
          isDropdownOpen &&
          filteredPassengers.length > 0 && (
            <ul
              className={cn(
                'absolute z-10 w-full mt-1 max-h-48 overflow-y-auto rounded shadow-lg',
                palette.card,
                palette.border
              )}
            >
              {filteredPassengers.map((p) => (
                <li
                  key={p.id}
                  className={cn(
                    'p-2 cursor-pointer',
                    palette.text,
                    palette.hover // FIX: Apply hover class from palette
                  )}
                  onClick={() => handleSelectPassenger(p)}
                >
                  {p.name} ({p.phone})
                </li>
              ))}
            </ul>
          )
        )}

        {isDropdownOpen && filteredPassengers.length === 0 && (
          <div
            className={cn(
              'mt-2 p-2 rounded text-center',
              palette.card,
              palette.border,
              palette.mutedText
            )}
          >
            No passengers found.
          </div>
        )}
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Vehicle Type
        </label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        >
          <option value="mini">Mini</option>
          <option value="sedan">Sedan</option>
          <option value="van">Van</option>
        </select>
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Pickup Latitude
        </label>
        <input
          type="number"
          step="any"
          name="pickupLatitude"
          value={formData.pickupLatitude}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Pickup Longitude
        </label>
        <input
          type="number"
          step="any"
          name="pickupLongitude"
          value={formData.pickupLongitude}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Pickup Address
        </label>
        <input
          type="text"
          name="pickupAddress"
          value={formData.pickupAddress}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Dropoff Latitude
        </label>
        <input
          type="number"
          step="any"
          name="dropoffLatitude"
          value={formData.dropoffLatitude}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Dropoff Longitude
        </label>
        <input
          type="number"
          step="any"
          name="dropoffLongitude"
          value={formData.dropoffLongitude}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Dropoff Address
        </label>
        <input
          type="text"
          name="dropoffAddress"
          value={formData.dropoffAddress}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        />
      </div>

      {isEditMode && (
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={cn(
              'w-full p-2 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
          >
            <option value="requested">Requested</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-4 py-2 rounded-md border',
            palette.border,
            palette.card,
            palette.text,
            palette.hover
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || passengersLoading}
          className={cn(
            'px-4 py-2 rounded-md text-white flex items-center justify-center',
            palette.btnPrimary
          )}
        >
          {(loading || passengersLoading) && (
            <Spinner size="small" className="mr-2" />
          )}
          {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
