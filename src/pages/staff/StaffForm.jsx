// File: src/pages/StaffForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

// Mock permissions data - in a real app, you'd fetch this from an API
const PERMISSIONS = [
  { id: 1, name: 'role:create', category: 'Roles' },
  { id: 2, name: 'role:read', category: 'Roles' },
  { id: 3, name: 'role:update', category: 'Roles' },
  { id: 4, name: 'role:delete', category: 'Roles' },
  { id: 5, name: 'permission:create', category: 'Permissions' },
  { id: 6, name: 'permission:read', category: 'Permissions' },
  { id: 7, name: 'permission:update', category: 'Permissions' },
  { id: 8, name: 'permission:delete', category: 'Permissions' },
  { id: 9, name: 'user:read', category: 'Users' },
  { id: 10, name: 'user:update', category: 'Users' },
  { id: 11, name: 'admin:create', category: 'Admins' },
  { id: 12, name: 'admin:read', category: 'Admins' },
  { id: 13, name: 'admin:update', category: 'Admins' },
  { id: 14, name: 'admin:delete', category: 'Admins' },
  { id: 15, name: 'driver:approve', category: 'Drivers' },
  { id: 16, name: 'driver:create', category: 'Drivers' },
  { id: 17, name: 'driver:read', category: 'Drivers' },
  { id: 18, name: 'driver:update', category: 'Drivers' },
  { id: 19, name: 'driver:delete', category: 'Drivers' },
  { id: 20, name: 'driver:documents:update', category: 'Drivers' },
  { id: 21, name: 'driver:documents:approve', category: 'Drivers' },
  { id: 22, name: 'passenger:read', category: 'Passengers' },
  { id: 23, name: 'passenger:update', category: 'Passengers' },
  { id: 24, name: 'passenger:delete', category: 'Passengers' },
  { id: 25, name: 'staff:create', category: 'Staff' },
  { id: 26, name: 'staff:read', category: 'Staff' },
  { id: 27, name: 'staff:update', category: 'Staff' },
  { id: 28, name: 'staff:delete', category: 'Staff' },
  { id: 32, name: 'role:create', category: 'Roles' },
];

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
    password: '',
    roleId: '',
    department: '',
    status: true,
    ...safeInitialData,
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      fullName: '',
      username: '',
      password: '',
      roleId: '',
      department: '',
      status: true,
      ...safeInitialData,
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
      // Update: include password only if user entered a new one
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
          Role ID
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

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Department
        </label>
        <input
          type="text"
          name="department"
          value={formData.department || ''}
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
