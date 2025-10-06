// src/pages/assignment/BookingAssignForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import { bookingApi } from '../../services/bookingApi';
import Spinner from '../../components/ui/Spinner';
import { useToast } from '../../hooks/useToast';

const BookingAssignForm = ({
  assignment,
  onCancel,
  onSubmit,
  loading,
  palette,
}) => {
  const { addToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const data = await bookingApi.list(); // fetch all bookings
      setBookings(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.error(err);
      addToast('Failed to load bookings', 'error');
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return bookings.filter(
      (b) =>
        b.passenger?.name?.toLowerCase().includes(q) ||
        b.pickup?.address?.toLowerCase().includes(q) ||
        b.dropoff?.address?.toLowerCase().includes(q)
    );
  }, [bookings, searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBookingId) {
      addToast('Please select a booking', 'error');
      return;
    }
    try {
      await onSubmit({
        driverId: assignment.driverId,
        bookingId: selectedBookingId,
      });
    } catch (err) {
      addToast(err?.message || 'Failed to assign booking', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Search Booking
        </label>
        <input
          type="text"
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          placeholder="Search by passenger or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-h-64 overflow-y-auto border rounded p-2">
        {loadingBookings ? (
          <div className="flex items-center space-x-2">
            <Spinner size="small" />
            <span className={cn('text-sm', palette.mutedText)}>
              Loading bookings...
            </span>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div key={b.id} className="flex items-center space-x-2 mb-1">
              <input
                type="radio"
                id={`booking-${b.id}`}
                name="selectedBooking"
                value={b.id}
                checked={selectedBookingId === b.id}
                onChange={() => setSelectedBookingId(b.id)}
              />
              <label
                htmlFor={`booking-${b.id}`}
                className={cn('text-sm', palette.text)}
              >
                {b.passenger?.name} | {b.pickup?.address} → {b.dropoff?.address}{' '}
                | {b.status}
              </label>
            </div>
          ))
        )}
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
          disabled={loading || loadingBookings}
          className={cn('px-4 py-2 rounded-md text-white', palette.btnPrimary)}
        >
          Assign Booking
        </button>
      </div>
    </form>
  );
};

export default BookingAssignForm;
