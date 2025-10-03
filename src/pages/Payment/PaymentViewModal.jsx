import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const PaymentViewModal = ({ isOpen, onClose, payment }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !payment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Details"
      palette={palette}
    >
      <div className="space-y-4">
        <h3 className={cn('text-lg font-semibold', palette.text)}>
          {payment.name}
        </h3>

        {payment.logo && (
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-2', palette.text)}>Logo URL</h4>
            <a
              href={payment.logo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 underline"
            >
              <ExternalLink size={16} />
              {payment.logo}
            </a>
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

export default PaymentViewModal;
