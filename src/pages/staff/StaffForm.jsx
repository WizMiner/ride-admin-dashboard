// File: src/pages/StaffForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { roleApi } from '../../services/roleApi';

const StaffForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    roleId: safeInitialData?.roles?.[0]?.id || '',
    department: '',
    status: true,
    salary: '',
    bankAccountNo: '',
    password: '',
  });

  useEffect(() => {
    setFormData({
      fullName: safeInitialData.fullName || '',
      username: safeInitialData.username || '',
      roleId: safeInitialData?.roles?.[0]?.id || '',
      department: safeInitialData.department || '',
      status: safeInitialData.status === '0' ? false : true,
      salary: safeInitialData.salary || '',
      bankAccountNo: safeInitialData.bankAccountNo || '',
      password: '',
    });
  }, [safeInitialData]);

  // Fetch roles dynamically
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const { data } = await roleApi.list();
        setRoles(data || []);
      } catch (err) {
        console.error('Failed to load roles:', err);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      roleId: parseInt(formData.roleId, 10),
      department: formData.department,
      status: formData.status,
    };

    if (safeInitialData?.id) {
      // Update case
      if (formData.password) payload.password = formData.password;
      if (formData.salary) payload.salary = Number(formData.salary);
      if (formData.bankAccountNo)
        payload.bankAccountNo = formData.bankAccountNo;
      payload.id = safeInitialData.id;
    } else {
      // Create case
      payload.password = formData.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
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

      {/* Username */}
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

      {/* Password */}
      {!safeInitialData?.id ? (
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
      ) : (
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

      {/* Role */}
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Role
        </label>
        <select
          name="roleId"
          value={formData.roleId ? String(formData.roleId) : ''}
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
          {loadingRoles ? (
            <option disabled>Loading roles...</option>
          ) : (
            roles.map((role) => (
              <option key={role.id} value={String(role.id)}>
                {role.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Salary & Bank Account (only for update) */}
      {safeInitialData?.id && (
        <>
          <div>
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary || ''}
              onChange={handleChange}
              className={cn(
                'w-full p-2 border rounded',
                palette.border,
                palette.card,
                palette.text
              )}
            />
          </div>

          <div>
            <label
              className={cn('block text-sm font-medium mb-1', palette.text)}
            >
              Bank Account No
            </label>
            <input
              type="text"
              name="bankAccountNo"
              value={formData.bankAccountNo || ''}
              onChange={handleChange}
              className={cn(
                'w-full p-2 border rounded',
                palette.border,
                palette.card,
                palette.text
              )}
            />
          </div>
        </>
      )}

      {/* Status */}
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

      {/* Buttons */}
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
