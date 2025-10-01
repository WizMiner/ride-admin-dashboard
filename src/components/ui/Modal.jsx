import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../common/utils';

const Modal = ({ isOpen, onClose, title, children, palette }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center lg:ml-60 lg:mt-16',
        'backdrop-blur-sm',
        palette.modalOverlay
      )}
    >
      <div
        className={cn(
          'p-6 rounded-lg w-full max-w-2xl shadow-xl',
          'max-h-[85vh] overflow-y-auto',
          palette.card,
          palette.border,
          palette.text
        )}
      >
        <div
          className={cn(
            'flex justify-between items-center mb-4',
            palette.card,
            palette.border
          )}
        >
          <h2 className={cn('text-xl font-semibold', palette.text)}>{title}</h2>
          <button
            onClick={onClose}
            className={cn('p-2 rounded-md', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
