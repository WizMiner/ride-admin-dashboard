// File: src/pages/RoleForm.jsx
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

const RoleForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  // Memoize initial data to avoid useEffect infinite loops
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    name: '',
    permissionIds: [],
    ...safeInitialData,
  });

  useEffect(() => {
    // Reset form when initialData changes
    setFormData({
      name: '',
      permissionIds: [],
      ...safeInitialData,
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId) => {
    setFormData((prev) => {
      const newPermissionIds = prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter((id) => id !== permissionId)
        : [...prev.permissionIds, permissionId];

      return { ...prev, permissionIds: newPermissionIds };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload
    const payload = {
      name: formData.name,
      permissionIds: formData.permissionIds.map((id) => parseInt(id)),
    };

    if (safeInitialData?.id) {
      // Include id for update
      payload.id = safeInitialData.id;
    }

    onSubmit(payload);
  };

  // Group permissions by category
  const permissionsByCategory = PERMISSIONS.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Role Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
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
          Permissions
        </label>
        <div
          className={cn(
            'border rounded p-3 max-h-60 overflow-y-auto',
            palette.border,
            palette.card
          )}
        >
          {Object.entries(permissionsByCategory).map(
            ([category, permissions]) => (
              <div key={category} className="mb-4">
                <h4 className={cn('font-medium text-sm mb-2', palette.text)}>
                  {category}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissionIds.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="mr-2"
                      />
                      <span className={cn('text-sm', palette.text)}>
                        {permission.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
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

export default RoleForm;
