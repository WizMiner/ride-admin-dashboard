// File: src/pages/RoleForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { permissionApi } from '../../services/permissionApi';

const RoleForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    name: '',
    permissionIds: [],
    ...safeInitialData,
  });

  const [permissions, setPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  // Fetch all permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { data } = await permissionApi.list();
        setPermissions(data);

        setFormData({
          name: safeInitialData.name || '',
          permissionIds: safeInitialData.permissions
            ? safeInitialData.permissions.map((p) => p.id)
            : [],
          id: safeInitialData.id,
        });
      } catch (err) {
        console.error('Failed to load permissions:', err);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
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

    const payload = {
      name: formData.name,
      permissionIds: formData.permissionIds,
    };

    if (formData.id) payload.id = formData.id;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Name */}
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

      {/* Permissions */}
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
          {loadingPermissions ? (
            <p className={cn('text-sm', palette.mutedText)}>
              Loading permissions...
            </p>
          ) : permissions.length > 0 ? (
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
          ) : (
            <p className={cn('text-sm', palette.mutedText)}>
              No permissions found.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
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
          {loading ? 'Saving...' : formData.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
