// File: src/components/ui/AdminViewModal.jsx
import React from 'react';
import { Mail } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const AdminViewModal = ({ isOpen, onClose, admin }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !admin) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Admin Details"
      palette={palette}
    >
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
              <span className={cn('text-sm', palette.text)}>{admin.email}</span>
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
    </Modal>
  );
};

export default AdminViewModal;
