import React from 'react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import Modal from '../../components/ui/Modal';

const AssignmentViewModal = ({ isOpen, onClose, assignment }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !assignment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assignment ${assignment.id}`}
      palette={palette}
    >
      <div className="space-y-4">
        <div>
          <h4 className={cn('font-medium mb-2', palette.text)}>Booking ID</h4>
          <p className={cn(palette.text)}>{assignment.bookingId}</p>
        </div>

        <div>
          <h4 className={cn('font-medium mb-2', palette.text)}>Driver ID</h4>
          <p className={cn(palette.text)}>{assignment.driverId}</p>
        </div>

        <div>
          <h4 className={cn('font-medium mb-2', palette.text)}>Status</h4>
          <p className={cn(palette.text)}>{assignment.status}</p>
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
    </Modal>
  );
};

export default AssignmentViewModal;
