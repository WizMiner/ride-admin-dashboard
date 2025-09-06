// File: src/pages/AdminForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const AdminForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
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
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {safeInitialData?.id && (
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {!safeInitialData?.id && (
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}

      {safeInitialData?.id && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Password (leave empty to keep current)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center justify-center"
        >
          {loading && <Spinner size="small" className="mr-2" />}
          {loading ? 'Saving...' : safeInitialData.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
