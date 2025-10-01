// File: src/components/ui/DriverViewModal.jsx
import React from 'react';
import {
  Phone,
  Mail,
  Star,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';
import Modal from '../../components/ui/Modal';

const DriverViewModal = ({ isOpen, onClose, driver }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (!isOpen || !driver) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityStatus = (isAvailable) => {
    return isAvailable ? (
      <span className="flex items-center text-sm font-medium text-green-600">
        <CheckCircle size={14} className="mr-1" /> Available
      </span>
    ) : (
      <span className="flex items-center text-sm font-medium text-red-600">
        <XCircle size={14} className="mr-1" /> Offline
      </span>
    );
  };

  const renderDate = (date) =>
    date ? new Date(date).toLocaleDateString() : 'N/A';

  const renderFileLink = (fileName) => {
    if (!fileName) return 'Not available';
    const baseUrl = import.meta.env.VITE_AUTHENTICATION_BACKEND_API;
    const fileUrl = `${baseUrl}/uploads/drivers/${fileName}`;
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('underline', palette.text)}
      >
        View File
      </a>
    );
  };

  const emergencyContacts = driver.emergencyContacts
    ? JSON.parse(driver.emergencyContacts)
    : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Driver Details"
      palette={palette}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              palette.avatarBg,
              'text-white text-2xl font-semibold'
            )}
          >
            {driver.name
              ?.split(' ')
              .map((n) => n[0])
              .join('') || 'D'}
          </div>
          <div>
            <h3 className={cn('text-lg font-semibold', palette.text)}>
              {driver.name}
            </h3>
            {/* <p className={cn('text-sm', palette.text)}>ID: {driver.id}</p> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className={cn(palette.mutedText)} />
                <span className={cn('text-sm', palette.text)}>
                  {driver.phone}
                </span>
              </div>
              {driver.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className={cn(palette.mutedText)} />
                  <span className={cn('text-sm', palette.text)}>
                    {driver.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Vehicle Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Car Name
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carName || 'N/A'}
                </p>
              </div>
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Vehicle Type
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {driver.vehicleType || 'N/A'}
                </p>
              </div>
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Car Model
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carModel || 'N/A'}
                </p>
              </div>
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Car Color
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carColor || 'N/A'}
                </p>
              </div>
              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Car Plate
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {driver.carPlate || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'p-4 rounded-lg md:col-span-2',
              palette.primaryLightBg
            )}
          >
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Document & Status
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <FileText size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Driving License
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderFileLink(driver.drivingLicenseFile)}
                </p>
              </div>
              <div>
                <FileText size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  National ID
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderFileLink(driver.nationalIdFile)}
                </p>
              </div>

              <div>
                <p className={cn('text-sm font-medium', palette.text)}>
                  Status
                </p>
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(driver.status || 'unknown')
                  )}
                >
                  {driver.status || 'unknown'}
                </span>
              </div>
              <div>
                <FileText size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Vehicle Registration
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderFileLink(driver.vehicleRegistrationFile)}
                </p>
              </div>
              <div>
                <FileText size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Insurance
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderFileLink(driver.insuranceFile)}
                </p>
              </div>

              <div>
                <p className={cn('text-sm font-medium mt-2', palette.text)}>
                  Document Status
                </p>
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(driver.documentStatus || 'unknown')
                  )}
                >
                  {driver.documentStatus || 'unknown'}
                </span>
              </div>
            </div>
          </div>

          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>Financials</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Wallet Balance:
                </span>
                <span className={cn('text-sm font-medium', 'text-green-600')}>
                  Birr {parseFloat(driver.wallet || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Payment Preference:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {driver.paymentPreference || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn('text-sm', palette.mutedText)}>
                  Bank Account No:
                </span>
                <span className={cn('text-sm font-medium', palette.text)}>
                  {driver.bankAccountNo || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className={cn('p-4 rounded-lg', palette.primaryLightBg)}>
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Availability & Rating
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={cn('text-sm', palette.mutedText)}>
                  Availability:
                </span>
                {getAvailabilityStatus(driver.availability)}
              </div>
              <div className="flex justify-between items-center">
                <span className={cn('text-sm', palette.mutedText)}>
                  Rating:
                </span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  <span className={cn('text-sm font-medium', palette.text)}>
                    {driver.rating || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {emergencyContacts.length > 0 && (
            <div
              className={cn(
                'p-4 rounded-lg md:col-span-2',
                palette.primaryLightBg
              )}
            >
              <h4 className={cn('font-medium mb-3', palette.text)}>
                Emergency Contacts
              </h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between">
                    <span className={cn('text-sm', palette.mutedText)}>
                      {contact.name}
                    </span>
                    <span className={cn('text-sm font-medium', palette.text)}>
                      {contact.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={cn(
              'p-4 rounded-lg md:col-span-2',
              palette.primaryLightBg
            )}
          >
            <h4 className={cn('font-medium mb-3', palette.text)}>
              Important Dates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Calendar size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Car Service
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderDate(driver.carServiceDate)}
                </p>
              </div>
              <div>
                <Calendar size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Bollo Renewal
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderDate(driver.bolloRenewalDate)}
                </p>
              </div>
              <div>
                <Calendar size={16} className={cn(palette.mutedText)} />
                <p className={cn('text-sm font-medium mt-1', palette.text)}>
                  Insurance Expiry
                </p>
                <p className={cn('text-sm', palette.text)}>
                  {renderDate(driver.insuranceExpiry)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DriverViewModal;
