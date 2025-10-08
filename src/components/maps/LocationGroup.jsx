// src/components/maps/LocationGroup.jsx
import React, { useRef, useEffect } from 'react';
import { cn } from '../../common/utils';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const LocationGroup = ({ prefix, formData, setFormData, palette, label }) => {
  const { isLoaded } = useGoogleMaps();
  const inputRef = useRef(null);

  const addressValue = formData[`${prefix}Address`] || '';
  const latValue = formData[`${prefix}Latitude`] || '';
  const lngValue = formData[`${prefix}Longitude`] || '';

  const handleAddressChange = (e) => {
    setFormData((prev) => ({ ...prev, [`${prefix}Address`]: e.target.value }));
  };

  const handleLatChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [`${prefix}Latitude`]: value }));

    if (isLoaded && window.google && !isNaN(parseFloat(value)) && lngValue) {
      const geocoder = new window.google.maps.Geocoder();
      const lat = parseFloat(value);
      const lng = parseFloat(lngValue);
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setFormData((prev) => ({
            ...prev,
            [`${prefix}Address`]: results[0].formatted_address,
          }));
        }
      });
    }
  };

  const handleLngChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [`${prefix}Longitude`]: value }));

    if (isLoaded && window.google && !isNaN(parseFloat(value)) && latValue) {
      const geocoder = new window.google.maps.Geocoder();
      const lat = parseFloat(latValue);
      const lng = parseFloat(value);
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setFormData((prev) => ({
            ...prev,
            [`${prefix}Address`]: results[0].formatted_address,
          }));
        }
      });
    }
  };

  const formControlClasses = cn(
    'w-full p-2 border rounded',
    palette.border,
    palette.card,
    palette.text,
    palette.focusRing
  );

  useEffect(() => {
    if (!isLoaded || !inputRef.current || typeof window.google === 'undefined')
      return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['address'],
        componentRestrictions: { country: 'et' },
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || '';

      setFormData((prev) => ({
        ...prev,
        [`${prefix}Latitude`]: lat.toString(),
        [`${prefix}Longitude`]: lng.toString(),
        [`${prefix}Address`]: address,
      }));
    });

    // Cleanup
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, prefix, setFormData]);

  return (
    <div
      className={cn(
        'space-y-2 border rounded p-4',
        palette.border,
        palette.card
      )}
    >
      <h3 className={cn('font-medium mb-2', palette.text)}>{label}</h3>
      <div>
        <label className={cn('block text-sm font-medium mb-1', palette.text)}>
          Address
        </label>
        <input
          ref={inputRef}
          type="text"
          value={addressValue}
          onChange={handleAddressChange}
          className={formControlClasses}
          placeholder="Start typing for autocomplete..."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={latValue}
            onChange={handleLatChange}
            className={formControlClasses}
            required
          />
        </div>
        <div>
          <label className={cn('block text-sm font-medium mb-1', palette.text)}>
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={lngValue}
            onChange={handleLngChange}
            className={formControlClasses}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LocationGroup;
