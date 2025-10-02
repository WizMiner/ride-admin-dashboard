// File: src/pages/pricing/PricingViewModal.jsx
import React from 'react';
import {
  X,
  DollarSign,
  Activity,
  Clock,
  AlertOctagon,
  Zap,
  ArrowDownCircle,
  ArrowUpCircle,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const PricingViewModal = ({ isOpen, onClose, pricing }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !pricing) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pricing Rule Details"
      palette={palette}
    >
      <div className="space-y-6">
        {/* Vehicle Type & Status */}
        <div
          className={cn(
            'flex items-start gap-4 p-3 rounded-lg border',
            pricing.isActive ? 'border-green-400' : 'border-red-400',
            palette.card
          )}
        >
          <div
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
              pricing.isActive ? 'bg-green-500/10' : 'bg-red-500/10'
            )}
          >
            <Zap
              size={24}
              className={pricing.isActive ? 'text-green-500' : 'text-red-500'}
            />
          </div>

          <div className="flex-grow">
            <h3 className={cn('text-xl font-bold capitalize', palette.text)}>
              {pricing.vehicleType}
            </h3>
            <p
              className={cn(
                'text-sm font-medium',
                pricing.isActive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {pricing.isActive ? 'Status: Active' : 'Status: Inactive'}
            </p>
            <p className={cn('text-xs', palette.mutedText)}>
              {/* ID: {pricing.id} */}
            </p>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4
            className={cn(
              'font-semibold mb-3 border-b pb-2',
              palette.text,
              palette.border
            )}
          >
            Fare Structure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Base Fare:{' '}
                <span className="font-medium">
                  {(pricing.baseFare ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Per KM:{' '}
                <span className="font-medium">
                  {(pricing.perKm ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Per Minute:{' '}
                <span className="font-medium">
                  {(pricing.perMinute ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertOctagon size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Wait/Min:{' '}
                <span className="font-medium">
                  {(pricing.waitingPerMinute ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDownCircle size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Min Fare:{' '}
                <span className="font-medium">
                  {(pricing.minimumFare ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpCircle size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Max Fare:{' '}
                <span className="font-medium">
                  {(pricing.maximumFare ?? 0).toFixed(2)} Birr
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
              <Zap size={16} className={cn(palette.accent)} />
              <span className={cn('text-sm', palette.text)}>
                Surge Multiplier:{' '}
                <span className="font-medium">
                  {pricing.surgeMultiplier ?? 1}x
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Description and Metadata */}
        <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
          <h4
            className={cn(
              'font-semibold mb-3 border-b pb-2',
              palette.text,
              palette.border
            )}
          >
            Rule Description & Metadata
          </h4>
          <div className="space-y-3">
            {/* Description */}
            <div className="flex items-start gap-2">
              <MessageSquare
                size={16}
                className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
              />
              <div>
                <p className={cn('text-xs font-medium', palette.mutedText)}>
                  Description
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {pricing.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar
                  size={16}
                  className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
                />
                <div>
                  <p className={cn('text-xs font-medium', palette.mutedText)}>
                    Created
                  </p>
                  <p className={cn('text-sm', palette.text)}>
                    {formatDate(pricing.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar
                  size={16}
                  className={cn(palette.mutedText, 'mt-1 flex-shrink-0')}
                />
                <div>
                  <p className={cn('text-xs font-medium', palette.mutedText)}>
                    Last Updated
                  </p>
                  <p className={cn('text-sm', palette.text)}>
                    {formatDate(pricing.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className={cn(
            'px-6 py-2 rounded-md font-medium transition-colors',
            palette.btnPrimary
          )}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PricingViewModal;
