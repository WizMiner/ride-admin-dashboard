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
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isUpdate = !!safeInitialData?._id;

  const [formData, setFormData] = useState({
    vehicleType: safeInitialData.vehicleType || '',
    baseFare: safeInitialData.baseFare || 0,
    perKm: safeInitialData.perKm || 0,
    perMinute: safeInitialData.perMinute || 0,
    waitingPerMinute: safeInitialData.waitingPerMinute || 0,
    surgeMultiplier: safeInitialData.surgeMultiplier || 1,
    // --- NEW FIELDS ADDED ---
    minimumFare: safeInitialData.minimumFare || 0,
    maximumFare: safeInitialData.maximumFare || 0,
    active: safeInitialData.active ?? true, // Use ?? true for boolean default
    description: safeInitialData.description || '',
  });

  useEffect(() => {
    setFormData({
      vehicleType: safeInitialData.vehicleType || '',
      baseFare: safeInitialData.baseFare || 0,
      perKm: safeInitialData.perKm || 0,
      perMinute: safeInitialData.perMinute || 0,
      waitingPerMinute: safeInitialData.waitingPerMinute || 0,
      surgeMultiplier: safeInitialData.surgeMultiplier || 1,
      // --- NEW FIELDS SYNCHRONIZED ---
      minimumFare: safeInitialData.minimumFare || 0,
      maximumFare: safeInitialData.maximumFare || 0,
      active: safeInitialData.active ?? true,
      description: safeInitialData.description || '',
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : [
                'baseFare',
                'perKm',
                'perMinute',
                'waitingPerMinute',
                'surgeMultiplier',
                'minimumFare', // Added
                'maximumFare', // Added
              ].includes(name)
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (isUpdate) {
      payload._id = safeInitialData._id;
    }
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Vehicle Type Dropdown */}
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
          <option value="">Select a vehicle type</option>
          <option value="mini">Mini</option>
          <option value="sedan">Sedan</option>
          <option value="van">Van</option>
        </select>
      </div>

      {/* Base Fare */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Base Fare (Birr)
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

      {/* Per KM */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Per KM (Birr)
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

      {/* Per Minute */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Per Minute (Birr)
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

      {/* Waiting Per Minute */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Waiting Per Minute (Birr)
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

      {/* Surge Multiplier */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Surge Multiplier (X)
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

      {/* Minimum Fare (NEW) */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Minimum Fare (Birr)
        </label>
        <input
          type="number"
          step="0.01"
          name="minimumFare"
          value={formData.minimumFare}
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

      {/* Maximum Fare (NEW) */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Maximum Fare (Birr)
        </label>
        <input
          type="number"
          step="0.01"
          name="maximumFare"
          value={formData.maximumFare}
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

      {/* Description (NEW) */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Description
        </label>
        <textarea
          name="description"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          placeholder="Brief description of this pricing rule"
        />
      </div>

      {/* Active Toggle (NEW) */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          id="active-toggle"
          className={cn('h-4 w-4 rounded border-gray-300', palette.checkbox)}
        />
        <label
          htmlFor="active-toggle"
          className={cn('text-sm font-medium', palette.text)}
        >
          Rule is Active
        </label>
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
          {loading ? 'Saving...' : isUpdate ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default PricingForm;
