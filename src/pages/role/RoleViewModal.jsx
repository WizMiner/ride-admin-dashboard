// File: src/components/ui/RoleViewModal.jsx
import React from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const RoleViewModal = ({ isOpen, onClose, role }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !role) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Role Details"
      palette={palette}
    >
      <div className="space-y-4">
        {/* Role Name */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              palette.avatarBg,
              'text-white text-2xl font-semibold'
            )}
          >
            <Shield size={24} />
          </div>
          <div>
            <h3 className={cn('text-lg font-semibold', palette.text)}>
              {role.name}
            </h3>
          </div>
        </div>

        {/* Permissions (Flat List) */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>
            Permissions ({role.permissions?.length || 0})
          </h4>

          {role.permissions?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {role.permissions.map((permission) => (
                <div key={permission.id} className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className={cn('text-sm', palette.text)}>
                    {permission.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <XCircle size={20} className="text-gray-400 mr-2" />
              <span className={cn('text-sm', palette.mutedText)}>
                No permissions assigned
              </span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RoleViewModal;
