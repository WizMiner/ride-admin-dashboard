// src/components/contracts/ContractForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';

const ContractForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isUpdate = !!safeInitialData?.id;

  // Ensure all inputs have default values to remain controlled
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price_per_km: '',
    discount_percentage: '',
    minimum_fare: '',
    maximum_passengers: '',
    features: {
      wifi: false,
      ac: false,
      premium_seats: false,
      priority_support: false,
    },
    is_active: true,
    ...safeInitialData,
  });

  // Parse features JSON string if coming from API
  useEffect(() => {
    const features =
      typeof safeInitialData.features === 'string'
        ? JSON.parse(safeInitialData.features)
        : safeInitialData.features || {
            wifi: false,
            ac: false,
            premium_seats: false,
            priority_support: false,
          };

    setFormData({
      name: safeInitialData.name || '',
      description: safeInitialData.description || '',
      base_price_per_km: safeInitialData.base_price_per_km ?? '',
      discount_percentage: safeInitialData.discount_percentage ?? '',
      minimum_fare: safeInitialData.minimum_fare ?? '',
      maximum_passengers: safeInitialData.maximum_passengers ?? '',
      features,
      is_active: safeInitialData.is_active ?? true,
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('features.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        features: { ...prev.features, [key]: checked },
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      base_price_per_km: parseFloat(formData.base_price_per_km) || 0,
      discount_percentage: parseFloat(formData.discount_percentage) || 0,
      minimum_fare: parseFloat(formData.minimum_fare) || 0,
      maximum_passengers: parseInt(formData.maximum_passengers) || 1,
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <FormInput
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        palette={palette}
        required
      />
      <FormTextarea
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        palette={palette}
        required
      />
      <FormInput
        name="base_price_per_km"
        label="Base Price per km"
        type="number"
        value={formData.base_price_per_km}
        onChange={handleChange}
        palette={palette}
        required
      />
      <FormInput
        name="discount_percentage"
        label="Discount %"
        type="number"
        value={formData.discount_percentage}
        onChange={handleChange}
        palette={palette}
        required
      />
      <FormInput
        name="minimum_fare"
        label="Minimum Fare"
        type="number"
        value={formData.minimum_fare}
        onChange={handleChange}
        palette={palette}
        required
      />
      <FormInput
        name="maximum_passengers"
        label="Maximum Passengers"
        type="number"
        value={formData.maximum_passengers}
        onChange={handleChange}
        palette={palette}
        required
      />

      <fieldset className="space-y-2">
        <legend className={cn('font-medium', palette.text)}>Features</legend>
        {['wifi', 'ac', 'premium_seats', 'priority_support'].map((f) => (
          <label
            key={f}
            className={cn('flex items-center space-x-2', palette.text)}
          >
            <input
              type="checkbox"
              name={`features.${f}`}
              checked={!!formData.features[f]}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <span>{f.replace('_', ' ').toUpperCase()}</span>
          </label>
        ))}
      </fieldset>

      <label className={cn('flex items-center space-x-2', palette.text)}>
        <input
          type="checkbox"
          name="is_active"
          checked={!!formData.is_active}
          onChange={handleChange}
          className="accent-blue-500"
        />
        <span>Active</span>
      </label>

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

export default ContractForm;
