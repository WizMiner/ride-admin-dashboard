// src/pages/live/LiveForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const LiveForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    driverId: safeInitialData.driverId || '',
    latitude: safeInitialData.latitude || 0,
    longitude: safeInitialData.longitude || 0,
    status: safeInitialData.status || 'en_route',
    tripId: safeInitialData.tripId || '',
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      driverId: safeInitialData.driverId || '',
      latitude: safeInitialData.latitude || 0,
      longitude: safeInitialData.longitude || 0,
      status: safeInitialData.status || 'en_route',
      tripId: safeInitialData.tripId || '',
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'latitude' || name === 'longitude'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload
    const payload = { ...formData };

    if (safeInitialData?._id) {
      payload._id = safeInitialData._id;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Driver ID
        </label>
        <input
          type="text"
          name="driverId"
          value={formData.driverId}
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
          Latitude
        </label>
        <input
          type="number"
          step="any"
          name="latitude"
          value={formData.latitude}
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
          Longitude
        </label>
        <input
          type="number"
          step="any"
          name="longitude"
          value={formData.longitude}
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
          required
        >
          <option value="en_route">En Route</option>
          <option value="arrived">Arrived</option>
        </select>
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Trip ID
        </label>
        <input
          type="text"
          name="tripId"
          value={formData.tripId}
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

export default LiveForm;
