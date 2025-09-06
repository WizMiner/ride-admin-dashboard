// File: src/components/crud/GenericViewModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../common/utils';

const GenericViewModal = ({
  isOpen,
  onClose,
  title,
  entity,
  sections,
  palette,
}) => {
  if (!isOpen || !entity) return null;

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
            {title} Details
          </h2>
          <button
            onClick={onClose}
            className={cn('p-1 rounded', palette.mutedText, palette.hover)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={cn('p-4 rounded-lg', palette.primaryLightBg)}
            >
              <h4 className={cn('font-medium mb-3', palette.text)}>
                {section.title}
              </h4>
              <div className="space-y-2">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex justify-between">
                    <span className={cn('text-sm', palette.mutedText)}>
                      {field.label}:
                    </span>
                    <span className={cn('text-sm font-medium', palette.text)}>
                      {field.render
                        ? field.render(entity[field.key])
                        : entity[field.key] || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

export default GenericViewModal;
