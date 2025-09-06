// File: src/components/ui/AdminViewModal.jsx
import React from 'react';
import { X, User, Mail } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const AdminViewModal = ({ isOpen, onClose, admin }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={cn(
          'rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto',
          palette.card,
          palette.border
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-xl font-semibold', palette.text)}>
            Admin Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                palette.avatarBg,
                'text-white text-2xl font-semibold'
              )}
            >
              {admin.fullName
                ?.split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                {admin.fullName}
              </h3>
              <p className={cn('text-sm', palette.mutedText)}>ID: {admin.id}</p>
              <p className={cn('text-sm', palette.mutedText)}>
                Username: {admin.username}
              </p>
            </div>
          </div>

          {admin.email && (
            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('font-medium mb-2', palette.text)}>Email</h4>
              <div className="flex items-center gap-2">
                <Mail size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  {admin.email}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className={cn('px-4 py-2 rounded-md', palette.btnPrimary)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminViewModal;
