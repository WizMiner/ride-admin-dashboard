import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import FormInput from '../../components/forms/FormInput';

const PaymentForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isUpdate = !!safeInitialData?.id;

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    ...safeInitialData,
  });

  useEffect(() => {
    setFormData({ ...safeInitialData });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      logo: formData.logo,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
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

      <FormInput
        name="logo"
        label="Logo URL"
        value={formData.logo}
        onChange={handleChange}
        palette={palette}
        required
      />

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

export default PaymentForm;
