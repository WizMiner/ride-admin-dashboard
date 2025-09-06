import Modal from '../../components/ui/Modal';

const PermissionViewModal = ({ open, onClose, permission }) => {
  if (!permission) return null;

  return (
    <Modal open={open} onClose={onClose} title="Permission Details">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <p className="mt-1 text-sm text-gray-900">{permission.id}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="mt-1 text-sm text-gray-900">{permission.name}</p>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionViewModal;
