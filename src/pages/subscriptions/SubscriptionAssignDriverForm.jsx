// File: src/pages/subscriptions/SubscriptionAssignDriverForm.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { driverApi } from '../../services/driverApi';
import { Search, RotateCcw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const SubscriptionAssignDriverForm = ({
  entity,
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    driverId: entity?.driver_id || '',
  });

  const [drivers, setDrivers] = useState([]);
  const [driversLoading, setDriversLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formControlClasses = cn(
    'w-full p-2 border rounded transition-colors duration-150',
    palette.border,
    palette.card,
    palette.text,
    palette.focusRing
  );

  const fetchDrivers = async () => {
    setDriversLoading(true);
    try {
      const response = await driverApi.list();
      const data = Array.isArray(response) ? response : response?.data || [];
      setDrivers(data);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
      addToast('Failed to load drivers. Please try again.', 'error');
      setDrivers([]);
    } finally {
      setDriversLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    setFormData((prev) => ({ ...prev, driverId: '' }));
  };

  const filteredDrivers = useMemo(() => {
    if (!Array.isArray(drivers)) return [];
    if (searchQuery.length === 0 && formData.driverId !== '') return [];
    return drivers.filter((d) => {
      const q = searchQuery.toLowerCase();
      // Assume driver object might use 'name' or 'fullName'
      const nameMatch =
        d.name?.toLowerCase().includes(q) ||
        d.fullName?.toLowerCase().includes(q);
      const phoneMatch = d.phone?.includes(q);
      const emailMatch = d.email?.toLowerCase().includes(q);
      return nameMatch || phoneMatch || emailMatch;
    });
  }, [drivers, searchQuery, formData.driverId]);

  const handleSelectDriver = (driver) => {
    setFormData((prev) => ({ ...prev, driverId: driver.id }));
    setSearchQuery(`${driver.name || driver.fullName} (${driver.phone})`);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.driverId) {
      addToast('Please select a driver', 'error');
      return;
    }

    // Payload required for subscriptionApi.assign
    const payload = { driver_id: formData.driverId };

    try {
      await onSubmit(payload);
    } catch (err) {
      addToast(err?.message || 'Failed to assign driver', 'error');
    }
  };

  // click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial search query if driver is already assigned
  useEffect(() => {
    if (entity?.driver_id && drivers.length > 0) {
      const initialDriver = drivers.find((d) => d.id === entity.driver_id);
      if (initialDriver) {
        setSearchQuery(
          `${initialDriver.name || initialDriver.fullName} (${initialDriver.phone})`
        );
        setFormData((prev) => ({ ...prev, driverId: initialDriver.id }));
      }
    }
  }, [entity, drivers]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Driver Search */}
      <div className="relative" ref={dropdownRef}>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Driver
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            className={cn('p-2 pr-10', formControlClasses)}
            placeholder="Search driver by name, phone, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            required
          />
          {/* ... (Search and Refresh buttons) */}
          <Search
            size={20}
            className={cn(
              'absolute right-9 top-1/2 -translate-y-1/2',
              palette.mutedText
            )}
          />
          <button
            type="button"
            onClick={fetchDrivers}
            disabled={driversLoading}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full',
              palette.mutedText,
              driversLoading && 'animate-spin'
            )}
            title="Refresh"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* ... (Dropdown logic for drivers) */}
        {driversLoading ? (
          <div className={cn('mt-2 p-2 rounded', palette.card, palette.border)}>
            <div className="flex items-center space-x-2">
              <Spinner size="small" />
              <span className={cn('text-sm', palette.mutedText)}>
                Loading drivers...
              </span>
            </div>
          </div>
        ) : (
          isDropdownOpen &&
          filteredDrivers.length > 0 && (
            <ul
              className={cn(
                'absolute z-10 w-full mt-1 max-h-48 overflow-y-auto rounded shadow-lg',
                palette.card,
                palette.border
              )}
            >
              {filteredDrivers.map((d) => (
                <li
                  key={d.id}
                  className={cn(
                    'p-2 cursor-pointer',
                    palette.text,
                    palette.hover
                  )}
                  onClick={() => handleSelectDriver(d)}
                >
                  {d.name || d.fullName} ({d.phone})
                </li>
              ))}
            </ul>
          )
        )}

        {isDropdownOpen && filteredDrivers.length === 0 && searchQuery && (
          <div
            className={cn(
              'mt-2 p-2 rounded text-center',
              palette.card,
              palette.border,
              palette.mutedText
            )}
          >
            No drivers found.
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-4 py-2 rounded-md border',
            palette.border,
            palette.card,
            palette.text,
            palette.hover
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || driversLoading || !formData.driverId}
          className={cn(
            'px-4 py-2 rounded-md text-white flex items-center justify-center',
            palette.btnPrimary,
            (!formData.driverId || loading || driversLoading) &&
              'opacity-50 cursor-not-allowed'
          )}
        >
          {(loading || driversLoading) && (
            <Spinner size="small" className="mr-2" />
          )}
          {loading ? 'Assigning...' : 'Assign Driver'}
        </button>
      </div>
    </form>
  );
};

export default SubscriptionAssignDriverForm;
