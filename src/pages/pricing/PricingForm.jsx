// src/pages/pricing/PricingForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const PricingForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    vehicleType: safeInitialData.vehicleType || '',
    baseFare: safeInitialData.baseFare || 0,
    perKm: safeInitialData.perKm || 0,
    perMinute: safeInitialData.perMinute || 0,
    waitingPerMinute: safeInitialData.waitingPerMinute || 0,
    surgeMultiplier: safeInitialData.surgeMultiplier || 1,
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      vehicleType: safeInitialData.vehicleType || '',
      baseFare: safeInitialData.baseFare || 0,
      perKm: safeInitialData.perKm || 0,
      perMinute: safeInitialData.perMinute || 0,
      waitingPerMinute: safeInitialData.waitingPerMinute || 0,
      surgeMultiplier: safeInitialData.surgeMultiplier || 1,
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'vehicleType' ? value : parseFloat(value) || 0,
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
          Vehicle Type
        </label>
        <input
          type="text"
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
        />
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Base Fare
        </label>
        <input
          type="number"
          step="0.01"
          name="baseFare"
          value={formData.baseFare}
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
          Per KM
        </label>
        <input
          type="number"
          step="0.01"
          name="perKm"
          value={formData.perKm}
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
          Per Minute
        </label>
        <input
          type="number"
          step="0.01"
          name="perMinute"
          value={formData.perMinute}
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
          Waiting Per Minute
        </label>
        <input
          type="number"
          step="0.01"
          name="waitingPerMinute"
          value={formData.waitingPerMinute}
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
          Surge Multiplier
        </label>
        <input
          type="number"
          step="0.1"
          name="surgeMultiplier"
          value={formData.surgeMultiplier}
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

export default PricingForm;
