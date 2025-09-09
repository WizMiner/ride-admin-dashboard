// src/pages/trip/TripForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const TripForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    bookingId: '',
    driverId: '',
    passengerId: '',
    status: 'completed',
    dateOfTravel: '',
    notes: '',
    ...safeInitialData,
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      bookingId: '',
      driverId: '',
      passengerId: '',
      status: 'completed',
      dateOfTravel: '',
      notes: '',
      ...safeInitialData,
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
      notes: formData.notes,
      // Add other fields if updatable
    };

    if (safeInitialData?._id) {
      payload._id = safeInitialData._id;
    } else {
      // For create, if supported
      payload.bookingId = formData.bookingId;
      payload.driverId = formData.driverId;
      payload.passengerId = formData.passengerId;
      payload.status = formData.status;
      payload.dateOfTravel = formData.dateOfTravel;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!safeInitialData?._id && (
        <>
          <div>
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Booking ID
            </label>
            <input
              type="text"
              name="bookingId"
              value={formData.bookingId || ''}
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
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Driver ID
            </label>
            <input
              type="text"
              name="driverId"
              value={formData.driverId || ''}
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
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Passenger ID
            </label>
            <input
              type="text"
              name="passengerId"
              value={formData.passengerId || ''}
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
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status || 'completed'}
              onChange={handleChange}
              className={cn(
                'w-full p-2 border rounded',
                palette.border,
                palette.card,
                palette.text
              )}
              required
            >
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>

          <div>
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Date of Travel
            </label>
            <input
              type="datetime-local"
              name="dateOfTravel"
              value={formData.dateOfTravel || ''}
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
        </>
      )}

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded h-24',
            palette.border,
            palette.card,
            palette.text
          )}
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

export default TripForm;
