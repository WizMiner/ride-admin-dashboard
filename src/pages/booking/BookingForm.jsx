import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const BookingForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    passengerId: safeInitialData.passengerId || '',
    vehicleType: safeInitialData.vehicleType || 'mini',
    pickupLatitude: safeInitialData.pickup?.latitude || '',
    pickupLongitude: safeInitialData.pickup?.longitude || '',
    dropoffLatitude: safeInitialData.dropoff?.latitude || '',
    dropoffLongitude: safeInitialData.dropoff?.longitude || '',
    status: safeInitialData.status || 'requested',
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      passengerId: safeInitialData.passengerId || '',
      vehicleType: safeInitialData.vehicleType || 'mini',
      pickupLatitude: safeInitialData.pickup?.latitude || '',
      pickupLongitude: safeInitialData.pickup?.longitude || '',
      dropoffLatitude: safeInitialData.dropoff?.latitude || '',
      dropoffLongitude: safeInitialData.dropoff?.longitude || '',
      status: safeInitialData.status || 'requested',
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload
    const payload = {
      passengerId: formData.passengerId,
      vehicleType: formData.vehicleType,
      pickup: {
        latitude: parseFloat(formData.pickupLatitude),
        longitude: parseFloat(formData.pickupLongitude),
      },
      dropoff: {
        latitude: parseFloat(formData.dropoffLatitude),
        longitude: parseFloat(formData.dropoffLongitude),
      },
      status: formData.status,
    };

    if (safeInitialData?._id) {
      payload._id = safeInitialData._id;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          type="integer"
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
          type="integer"
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
          Dropoff Latitude
        </label>
        <input
          type="integer"
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
          type="integer"
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

      {safeInitialData?._id && (
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
          disabled={loading}
          className={cn(
            'px-4 py-2 rounded-md text-white flex items-center justify-center',
            palette.btnPrimary
          )}
        >
          {loading && <Spinner size="small" className="mr-2" />}
          {loading ? 'Saving...' : safeInitialData._id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
