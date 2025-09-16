// File: src/pages/AdminForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import FormInput from '../../components/forms/FormInput';

const AdminForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isUpdate = !!safeInitialData?.id;

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    ...safeInitialData,
  });

  useEffect(() => {
    setFormData({ ...safeInitialData, password: '' });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
    };
    if (isUpdate && formData.password) {
      payload.password = formData.password;
    } else if (!isUpdate) {
      payload.password = formData.password;
    }

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <FormInput
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        palette={palette}
        required
      />

      <FormInput
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        palette={palette}
        required
      />

      {isUpdate && (
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          palette={palette}
        />
      )}

      <FormInput
        name="password"
        label={isUpdate ? 'Password (leave empty to keep current)' : 'Password'}
        type="password"
        value={formData.password}
        onChange={handleChange}
        palette={palette}
        required={!isUpdate}
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

export default AdminForm;
