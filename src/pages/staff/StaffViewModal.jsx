// File: src/components/ui/StaffViewModal.jsx
import React from 'react';
import {
  X,
  User,
  Mail,
  Building,
  Shield,
  BadgeCheck,
  BadgeX,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const StaffViewModal = ({ isOpen, onClose, staff }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !staff) return null;

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Administrator';
      case 2:
        return 'Manager';
      case 3:
        return 'Support Staff';
      case 4:
        return 'HR';
      default:
        return `Role ${roleId}`;
    }
  };

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
            Staff Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Avatar and Name */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                palette.avatarBg,
                'text-white text-2xl font-semibold'
              )}
            >
              {staff.fullName
                ?.split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <h3 className={cn('text-lg font-semibold', palette.text)}>
                {staff.fullName}
              </h3>
              {/* <p className={cn('text-sm', palette.mutedText)}>ID: {staff.id}</p> */}
              <p className={cn('text-sm', palette.mutedText)}>
                Username: {staff.username}
              </p>
            </div>
          </div>

          {/* Role and Department */}
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Employment Details
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Role: {getRoleName(staff.roleId)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Department: {staff.department || 'Not specified'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {staff.status ? (
                  <>
                    <BadgeCheck size={16} className="text-green-500" />
                    <span className={cn('text-sm', 'text-green-600')}>
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <BadgeX size={16} className="text-red-500" />
                    <span className={cn('text-sm', 'text-red-600')}>
                      Inactive
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          {staff.salary && (
            <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
              <h4 className={cn('font-medium mb-2', palette.text)}>
                Financial Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={cn('text-sm', palette.mutedText)}>
                    Salary:
                  </span>
                  <span className={cn('text-sm font-medium', palette.text)}>
                    Birr {parseFloat(staff.salary || 0).toFixed(2)}
                  </span>
                </div>
                {staff.bankAccountNo && (
                  <div className="flex justify-between">
                    <span className={cn('text-sm', palette.mutedText)}>
                      Bank Account:
                    </span>
                    <span className={cn('text-sm font-medium', palette.text)}>
                      {staff.bankAccountNo}
                    </span>
                  </div>
                )}
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

export default StaffViewModal;
