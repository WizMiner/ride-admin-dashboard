// File: src/pages/PermissionViewModal.jsx
import Modal from '../../components/ui/Modal';
import { cn } from '../../common/utils';

const PermissionViewModal = ({ isOpen, onClose, permission, palette }) => {
  if (!permission) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Permission Details"
      palette={palette}
    >
      <div className="space-y-4">
        <p className={cn('text-sm font-medium', palette.text)}>Name</p>
        <p className={cn('mt-1 text-sm', palette.text)}>{permission.name}</p>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
              palette.button,
              palette.border
            )}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionViewModal;
