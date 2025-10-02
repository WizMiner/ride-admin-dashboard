// File: src/components/ui/StaffViewModal.jsx
import React from 'react';
import {
  Building,
  Shield,
  BadgeCheck,
  BadgeX,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const StaffViewModal = ({ isOpen, onClose, staff }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !staff) return null;

  const roleName =
    staff.roles && staff.roles.length > 0 ? staff.roles[0].name : 'No Role';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Staff Details"
      palette={palette}
    >
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
              .join('') || 'S'}
          </div>
          <div>
            <h3 className={cn('text-lg font-semibold', palette.text)}>
              {staff.fullName || 'N/A'}
            </h3>
            <p className={cn('text-sm', palette.mutedText)}>
              Username: {staff.username || 'N/A'}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        {/* <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-2', palette.text)}>
            Contact Information
          </h4>
          <div className="space-y-2">
            {staff.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  {staff.email}
                </span>
              </div>
            )}
            {staff.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  {staff.phone}
                </span>
              </div>
            )}
          </div>
        </div> */}

        {/* Employment Details */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4 className={cn('font-medium mb-3', palette.text)}>
            Employment Details
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Role: {roleName}
              </span>
            </div>
            {staff.department && (
              <div className="flex items-center gap-2">
                <Building size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  Department: {staff.department || 'Not specified'}
                </span>
              </div>
            )}
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
            <div className="flex items-center gap-2">
              <Calendar size={16} className={cn(palette.mutedText)} />
              <span className={cn('text-sm', palette.text)}>
                Hired: {new Date(staff.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        {(staff.salary || staff.bankAccountNo) && (
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-2', palette.text)}>
              Financial Information
            </h4>
            <div className="space-y-2">
              {staff.salary && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className={cn(palette.mutedText)} />
                    <span className={cn('text-sm', palette.mutedText)}>
                      Salary:
                    </span>
                  </div>
                  <span className={cn('text-sm font-medium', palette.text)}>
                    Birr {parseFloat(staff.salary).toFixed(2)}
                  </span>
                </div>
              )}
              {staff.bankAccountNo && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Building size={16} className={cn(palette.mutedText)} />
                    <span className={cn('text-sm', palette.mutedText)}>
                      Bank Account:
                    </span>
                  </div>
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
    </Modal>
  );
};

export default StaffViewModal;
