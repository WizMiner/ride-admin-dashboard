import React from 'react';
import Modal from '../../components/ui/Modal';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';

const ContractViewModal = ({ isOpen, onClose, contract }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !contract) return null;

  const features =
    typeof contract.features === 'string'
      ? JSON.parse(contract.features)
      : contract.features;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contract Details"
      palette={palette}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className={cn('text-2xl font-bold', palette.text)}>
            {contract.name}
          </h3>
          <p className={cn('text-sm text-gray-500', palette.mutedText)}>
            {contract.description}
          </p>
        </div>

        {/* Pricing & Info */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={cn(
              'p-3 rounded-lg border col-span-2 flex items-center justify-between',
              palette.border
            )}
          >
            <p className={cn('text-sm font-medium', palette.text)}>Status</p>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold',
                contract.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              )}
            >
              {contract.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border',
              palette.border,
              palette.primaryLightBg
            )}
          >
            <p className={cn('text-sm font-medium', palette.text)}>
              Base Price/km
            </p>
            <p className={cn('text-lg font-semibold', palette.text)}>
              {contract.base_price_per_km} Birr
            </p>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border',
              palette.border,
              palette.primaryLightBg
            )}
          >
            <p className={cn('text-sm font-medium', palette.text)}>Discount</p>
            <p className={cn('text-lg font-semibold', palette.text)}>
              {contract.discount_percentage}%
            </p>
          </div>
          <div className={cn('p-3 rounded-lg border', palette.border)}>
            <p className={cn('text-sm font-medium', palette.text)}>
              Minimum Fare
            </p>
            <p className={cn('text-lg font-semibold', palette.text)}>
              {contract.minimum_fare} Birr
            </p>
          </div>
          <div className={cn('p-3 rounded-lg border', palette.border)}>
            <p className={cn('text-sm font-medium', palette.text)}>
              Max Passengers
            </p>
            <p className={cn('text-lg font-semibold', palette.text)}>
              {contract.maximum_passengers}
            </p>
          </div>
        </div>

        {/* Features */}
        <div
          className={cn(
            'p-4 rounded-lg border',
            palette.border,
            palette.primaryLightBg
          )}
        >
          <h4 className={cn('font-medium mb-3', palette.text)}>Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {features &&
              Object.entries(features).map(([key, value]) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-md',
                    value
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  )}
                >
                  <span className="capitalize">{key.replace('_', ' ')}</span>
                  <span className="font-semibold">{value ? 'Yes' : 'No'}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className={cn(
              'px-5 py-2 rounded-md font-semibold',
              palette.btnPrimary
            )}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContractViewModal;
