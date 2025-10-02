// File: src/pages/DriverForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const DriverForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [status, setStatus] = useState(safeInitialData.status || 'pending');

  useEffect(() => {
    setStatus(safeInitialData.status || 'pending');
  }, [safeInitialData]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: safeInitialData.id, status });
  };

  const statusOptions = ['pending', 'approved', 'suspended', 'rejected'];

  const statusStyleMap = useMemo(() => {
    return {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-400',
      },
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-400',
      },
      suspended: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-400',
      },
      rejected: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-400',
      },
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={cn('block text-sm font-medium mb-2', palette.text)}>
          Driver Status
        </label>
        <div className="grid grid-cols-2 gap-4">
          {statusOptions.map((option) => {
            const isSelected = status === option;
            const style = statusStyleMap[option];

            return (
              <label
                key={option}
                className={cn(
                  'flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105',
                  isSelected
                    ? `${style.bg} ${style.border} border-2`
                    : cn('border-gray-300 hover:border-blue-400', palette.card)
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value={option}
                  checked={isSelected}
                  onChange={handleChange}
                  className="mr-2 accent-blue-500"
                />
                <span className={cn('capitalize font-medium', palette.text)}>
                  {option}
                </span>
              </label>
            );
          })}
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
          {loading ? 'Saving...' : 'Update Status'}
        </button>
      </div>
    </form>
  );
};

export default DriverForm;
