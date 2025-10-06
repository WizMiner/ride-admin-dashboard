import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';
import { passengerApi } from '../../services/passengerApi';
import { Search, RotateCcw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import LocationGroup from '../../components/maps/LocationGroup';
import LocationMap from '../../components/maps/LocationMap';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const BookingForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette,
}) => {
  const { isLoaded: mapsLoaded } = useGoogleMaps();
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);
  const isEditMode = useMemo(() => !!safeInitialData.id, [safeInitialData]);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    passengerId: safeInitialData.passengerId || '',
    vehicleType: safeInitialData.vehicleType || 'mini',
    pickupLatitude: safeInitialData.pickup?.latitude || '',
    pickupLongitude: safeInitialData.pickup?.longitude || '',
    pickupAddress: safeInitialData.pickup?.address || '',
    dropoffLatitude: safeInitialData.dropoff?.latitude || '',
    dropoffLongitude: safeInitialData.dropoff?.longitude || '',
    dropoffAddress: safeInitialData.dropoff?.address || '',
    status: safeInitialData.status || 'requested',
  });

  const [passengers, setPassengers] = useState([]);
  const [passengersLoading, setPassengersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchPassengers = useCallback(async () => {
    setPassengersLoading(true);
    try {
      const data = await passengerApi.list();
      setPassengers(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error('Failed to fetch passengers:', err);
      addToast('Failed to load passengers. Please try again.', 'error');
      setPassengers([]);
    } finally {
      setPassengersLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    setFormData({
      passengerId: safeInitialData.passengerId || '',
      vehicleType: safeInitialData.vehicleType || 'mini',
      pickupLatitude: safeInitialData.pickup?.latitude || '',
      pickupLongitude: safeInitialData.pickup?.longitude || '',
      pickupAddress: safeInitialData.pickup?.address || '',
      dropoffLatitude: safeInitialData.dropoff?.latitude || '',
      dropoffLongitude: safeInitialData.dropoff?.longitude || '',
      dropoffAddress: safeInitialData.dropoff?.address || '',
      status: safeInitialData.status || 'requested',
    });
  }, [safeInitialData]);

  useEffect(() => {
    fetchPassengers();
  }, [fetchPassengers]);

  // Reverse geocode for pickup - run only if address is missing
  const pickupGeocodedRef = useRef(false);
  useEffect(() => {
    if (
      pickupGeocodedRef.current ||
      !mapsLoaded ||
      !window.google ||
      !formData.pickupLatitude ||
      !formData.pickupLongitude ||
      formData.pickupAddress.trim()
    ) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const pos = {
      lat: parseFloat(formData.pickupLatitude),
      lng: parseFloat(formData.pickupLongitude),
    };
    geocoder.geocode({ location: pos }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setFormData((prev) => ({
          ...prev,
          pickupAddress: results[0].formatted_address,
        }));
        pickupGeocodedRef.current = true;
      }
    });
  }, [
    mapsLoaded,
    formData.pickupLatitude,
    formData.pickupLongitude,
    formData.pickupAddress,
  ]);

  // Reverse geocode for dropoff - run only if address is missing
  const dropoffGeocodedRef = useRef(false);
  useEffect(() => {
    if (
      dropoffGeocodedRef.current ||
      !mapsLoaded ||
      !window.google ||
      !formData.dropoffLatitude ||
      !formData.dropoffLongitude ||
      formData.dropoffAddress.trim()
    ) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const pos = {
      lat: parseFloat(formData.dropoffLatitude),
      lng: parseFloat(formData.dropoffLongitude),
    };
    geocoder.geocode({ location: pos }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setFormData((prev) => ({
          ...prev,
          dropoffAddress: results[0].formatted_address,
        }));
        dropoffGeocodedRef.current = true;
      }
    });
  }, [
    mapsLoaded,
    formData.dropoffLatitude,
    formData.dropoffLongitude,
    formData.dropoffAddress,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true);
    setFormData((prev) => ({ ...prev, passengerId: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      passengerId: formData.passengerId,
      vehicleType: formData.vehicleType,
      pickup: {
        latitude: parseFloat(formData.pickupLatitude),
        longitude: parseFloat(formData.pickupLongitude),
        address: formData.pickupAddress,
      },
      dropoff: {
        latitude: parseFloat(formData.dropoffLatitude),
        longitude: parseFloat(formData.dropoffLongitude),
        address: formData.dropoffAddress,
      },
      status: formData.status,
    };

    if (isEditMode) {
      payload.id = safeInitialData.id;
    }

    try {
      await onSubmit(payload);
    } catch (err) {
      const errorMessage =
        err?.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} booking.`;
      addToast(errorMessage, 'error');
    }
  };

  const filteredPassengers = useMemo(() => {
    if (!Array.isArray(passengers)) {
      return [];
    }

    if (searchQuery.length === 0 && formData.passengerId !== '') {
      return [];
    }

    return passengers.filter((p) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const nameMatch = p.name?.toLowerCase().includes(lowerCaseQuery);
      const phoneMatch = p.phone?.includes(lowerCaseQuery);
      const emailMatch = p.email?.toLowerCase().includes(lowerCaseQuery);
      return nameMatch || phoneMatch || emailMatch;
    });
  }, [passengers, searchQuery, formData.passengerId]);

  const handleSelectPassenger = useCallback((p) => {
    setFormData((prev) => ({ ...prev, passengerId: p.id }));
    setSearchQuery(`${p.name} (${p.phone})`);
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const initialSelectedPassenger = passengers.find(
      (p) => p.id === safeInitialData.passengerId
    );
    if (initialSelectedPassenger) {
      setSearchQuery(
        `${initialSelectedPassenger.name} (${initialSelectedPassenger.phone})`
      );
    } else {
      setSearchQuery('');
    }
  }, [safeInitialData, passengers]);

  const handlePickupMapChange = useCallback((coords, address) => {
    setFormData((prev) => ({
      ...prev,
      pickupLatitude: coords.latitude.toString(),
      pickupLongitude: coords.longitude.toString(),
      pickupAddress: address || prev.pickupAddress,
    }));
    pickupGeocodedRef.current = !!address;
  }, []);

  const handleDropoffMapChange = useCallback((coords, address) => {
    setFormData((prev) => ({
      ...prev,
      dropoffLatitude: coords.latitude.toString(),
      dropoffLongitude: coords.longitude.toString(),
      dropoffAddress: address || prev.dropoffAddress,
    }));
    dropoffGeocodedRef.current = !!address;
  }, []);

  const pickup = useMemo(
    () => ({
      lat: formData.pickupLatitude ? parseFloat(formData.pickupLatitude) : null,
      lng: formData.pickupLongitude
        ? parseFloat(formData.pickupLongitude)
        : null,
    }),
    [formData.pickupLatitude, formData.pickupLongitude]
  );

  const dropoff = useMemo(
    () => ({
      lat: formData.dropoffLatitude
        ? parseFloat(formData.dropoffLatitude)
        : null,
      lng: formData.dropoffLongitude
        ? parseFloat(formData.dropoffLongitude)
        : null,
    }),
    [formData.dropoffLatitude, formData.dropoffLongitude]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Passenger Search and Select Field */}
      <div className="relative" ref={dropdownRef}>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Passenger
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            className={cn(
              'w-full p-2 pr-10 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
            placeholder="Search by name, phone, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Search
            size={20}
            className={cn(
              'absolute right-9 top-1/2 -translate-y-1/2',
              palette.mutedText
            )}
          />
          <button
            type="button"
            onClick={fetchPassengers}
            disabled={passengersLoading}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full',
              palette.mutedText,
              passengersLoading && 'animate-spin'
            )}
            title="Refresh"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {passengersLoading ? (
          <div className={cn('mt-2 p-2 rounded', palette.card, palette.border)}>
            <div className="flex items-center space-x-2">
              <Spinner size="small" />
              <span className={cn('text-sm', palette.mutedText)}>
                Loading passengers...
              </span>
            </div>
          </div>
        ) : (
          isDropdownOpen &&
          filteredPassengers.length > 0 && (
            <ul
              className={cn(
                'absolute z-10 w-full mt-1 max-h-48 overflow-y-auto rounded shadow-lg',
                palette.card,
                palette.border
              )}
            >
              {filteredPassengers.map((p) => (
                <li
                  key={p.id}
                  className={cn(
                    'p-2 cursor-pointer hover:bg-gray-100',
                    palette.text,
                    palette.hover
                  )}
                  onClick={() => handleSelectPassenger(p)}
                >
                  {p.name} ({p.phone})
                </li>
              ))}
            </ul>
          )
        )}

        {isDropdownOpen && filteredPassengers.length === 0 && searchQuery && (
          <div
            className={cn(
              'mt-2 p-2 rounded text-center',
              palette.card,
              palette.border,
              palette.mutedText
            )}
          >
            No passengers found.
          </div>
        )}
      </div>

      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Vehicle Type
        </label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className={cn(
            'w-full p-2 border rounded',
            palette.border,
            palette.card,
            palette.text
          )}
          required
        >
          <option value="mini">Mini</option>
          <option value="sedan">Sedan</option>
          <option value="van">Van</option>
        </select>
      </div>

      <LocationGroup
        prefix="pickup"
        formData={formData}
        setFormData={setFormData}
        palette={palette}
        label="Pickup Location"
      />

      <LocationGroup
        prefix="dropoff"
        formData={formData}
        setFormData={setFormData}
        palette={palette}
        label="Dropoff Location"
      />

      {/* Integrated Google Map for visualization and editing */}
      {mapsLoaded ? (
        <LocationMap
          pickup={pickup}
          dropoff={dropoff}
          onPickupChange={handlePickupMapChange}
          onDropoffChange={handleDropoffMapChange}
          palette={palette}
        />
      ) : (
        <div
          className={cn(
            'h-96 flex items-center justify-center border rounded',
            palette.border,
            palette.card
          )}
        >
          <Spinner size="large" />
          <span className={cn('ml-2', palette.mutedText)}>Loading map...</span>
        </div>
      )}

      {isEditMode && (
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={cn(
              'w-full p-2 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
          >
            <option value="requested">Requested</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      )}

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
          disabled={loading || passengersLoading || !mapsLoaded}
          className={cn(
            'px-4 py-2 rounded-md text-white flex items-center justify-center',
            palette.btnPrimary,
            (!mapsLoaded || loading || passengersLoading) &&
              'opacity-50 cursor-not-allowed'
          )}
        >
          {(loading || passengersLoading) && (
            <Spinner size="small" className="mr-2" />
          )}
          {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
