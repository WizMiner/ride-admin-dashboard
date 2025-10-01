// File: src/pages/StaffForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const StaffForm = ({
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
    roleId: '',
    department: '',
    status: true,
    ...safeInitialData,
    password: '',
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      fullName: '',
      username: '',
      roleId: '',
      department: '',
      status: true,
      ...safeInitialData,
      password: '',
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload depending on create or update
    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      roleId: parseInt(formData.roleId),
      department: formData.department,
      status: formData.status,
    };

    if (safeInitialData?.id) {
      if (formData.password) {
        payload.password = formData.password;
      }
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

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Role
        </label>
        <select
          name="roleId"
          value={formData.roleId || ''}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        >
          <option value="">Select Role</option>
          <option value="1">Administrator</option>
          <option value="2">Manager</option>
          <option value="3">Support Staff</option>
          <option value="4">HR</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="status"
          id="status"
          checked={formData.status}
          onChange={handleChange}
          className="mr-2"
        />
        <label
          htmlFor="status"
          className={cn('text-sm font-medium', palette.text)}
        >
          Active Status
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
          {loading ? 'Saving...' : safeInitialData.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default StaffForm;
