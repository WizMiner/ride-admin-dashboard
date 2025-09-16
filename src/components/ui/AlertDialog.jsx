// File: src/components/ui/AlertDialog.jsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '../../common/utils';
import Spinner from './Spinner';

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={cn('bg-card rounded-lg p-6 w-full max-w-md', 'border-theme')}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-yellow-500" size={24} />
          <h2 className={cn('text-xl font-semibold', 'text-theme')}>{title}</h2>
        </div>

        <p className={cn('mb-6', 'text-muted-theme')}>{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={cn(
              'px-4 py-2 rounded-md border',
              'border-theme',
              'bg-card',
              'text-theme',
              'hover-theme'
            )}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-red-500 text-white',
              'hover:bg-red-600',
              'flex items-center justify-center'
            )}
          >
            {loading && <Spinner size="small" className="mr-2" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
