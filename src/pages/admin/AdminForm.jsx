// File: src/pages/AdminForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const AdminForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    ...safeInitialData,
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({ ...safeInitialData, password: '' });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload depending on create or update
    const payload = {
      fullName: formData.fullName,
      username: formData.username,
    };

    if (safeInitialData?.id) {
      // Update: include email if present
      if (formData.email) payload.email = formData.email;
      // Include password only if user entered a new one
      if (formData.password) payload.password = formData.password;
      // Include id for update
      payload.id = safeInitialData.id;
    } else {
      // Create: must include password
      payload.password = formData.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ''}
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
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
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

      {safeInitialData?.id && (
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={cn(
              'w-full p-2 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
          />
        </div>
      )}

      {!safeInitialData?.id && (
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
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
      )}

      {safeInitialData?.id && (
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Password (leave empty to keep current)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className={cn(
              'w-full p-2 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
          />
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
          {loading ? 'Saving...' : safeInitialData.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
