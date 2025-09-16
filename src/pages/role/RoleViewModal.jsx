// File: src/components/ui/RoleViewModal.jsx
import React from 'react';
import { X, Shield, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const RoleViewModal = ({ isOpen, onClose, role }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !role) return null;

  // Group permissions by category
  const permissionsByCategory = (role.permissions || []).reduce(
    (acc, permission) => {
      const category = permission.name.split(':')[0];
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(permission);
      return acc;
    },
    {}
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={cn(
          'rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto',
          palette.card,
          palette.border
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-xl font-semibold', palette.text)}>
            Role Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

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
              {/* <p className={cn('text-sm', palette.mutedText)}>ID: {role.id}</p> */}
            </div>
          </div>

          {/* Permissions */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Permissions ({role.permissions?.length || 0})
            </h4>

            {Object.keys(permissionsByCategory).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(permissionsByCategory).map(
                  ([category, permissions]) => (
                    <div key={category}>
                      <h5 className="font-medium text-sm mb-2 capitalize">
                        {category}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center"
                          >
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-2"
                            />
                            <span className={cn('text-sm', palette.text)}>
                              {permission.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
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

export default RoleViewModal;
