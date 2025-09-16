import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const PermissionForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ...safeInitialData,
  });

  useEffect(() => {
    setFormData({ ...safeInitialData });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
    };
    if (safeInitialData?.id) payload.id = safeInitialData.id;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

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

export default PermissionForm;
