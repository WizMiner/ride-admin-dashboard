// src/components/maps/LocationMap.jsx
/* global google */

import React, { useEffect, useRef } from 'react';
import { cn } from '../../common/utils';
import { defaultMapCenter } from '../../config/googleMaps';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const LocationMap = ({
  pickup,
  dropoff,
  currentDriver, // Live driver position
  onPickupChange,
  onDropoffChange,
  palette,
  height = '400px',
}) => {
  const { isLoaded } = useGoogleMaps();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropoffMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const geocoderRef = useRef(null);
  const clickListenerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || typeof window.google === 'undefined')
      return;

    const { google } = window;

    // Cleanup
    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      mapInstanceRef.current = null;
    }
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null);
      pickupMarkerRef.current = null;
    }
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.setMap(null);
      dropoffMarkerRef.current = null;
    }
    if (driverMarkerRef.current) {
      driverMarkerRef.current.setMap(null);
      driverMarkerRef.current = null;
    }
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    if (clickListenerRef.current) {
      google.maps.event.removeListener(clickListenerRef.current);
      clickListenerRef.current = null;
    }

    const map = new google.maps.Map(mapRef.current, {
      center: defaultMapCenter,
      zoom: 10,
      mapTypeId: 'roadmap',
    });
    mapInstanceRef.current = map;

    geocoderRef.current = new google.maps.Geocoder();

    const safePickup = pickup || { lat: null, lng: null };
    const safeDropoff = dropoff || { lat: null, lng: null };
    const safeDriver = currentDriver || { lat: null, lng: null };

    let hasPickup =
      safePickup.lat &&
      safePickup.lng &&
      !isNaN(safePickup.lat) &&
      !isNaN(safePickup.lng);
    let hasDropoff =
      safeDropoff.lat &&
      safeDropoff.lng &&
      !isNaN(safeDropoff.lat) &&
      !isNaN(safeDropoff.lng);
    let hasDriver =
      safeDriver.lat &&
      safeDriver.lng &&
      !isNaN(safeDriver.lat) &&
      !isNaN(safeDriver.lng);

    // Click to set locations
    const handleMapClick = (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (!hasPickup) {
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            let address = '';
            if (status === 'OK' && results[0])
              address = results[0].formatted_address;
            if (onPickupChange)
              onPickupChange({ latitude: lat, longitude: lng }, address);
          }
        );
        hasPickup = true;
      } else if (!hasDropoff) {
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            let address = '';
            if (status === 'OK' && results[0])
              address = results[0].formatted_address;
            if (onDropoffChange)
              onDropoffChange({ latitude: lat, longitude: lng }, address);
          }
        );
        hasDropoff = true;
      }
    };

    clickListenerRef.current = map.addListener('click', handleMapClick);

    // Pickup marker
    if (hasPickup) {
      const pos = { lat: safePickup.lat, lng: safePickup.lng };
      pickupMarkerRef.current = new google.maps.Marker({
        position: pos,
        map,
        title: 'Pickup',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      });
      map.setCenter(pos);
    }

    // Dropoff marker
    if (hasDropoff) {
      const pos = { lat: safeDropoff.lat, lng: safeDropoff.lng };
      dropoffMarkerRef.current = new google.maps.Marker({
        position: pos,
        map,
        title: 'Dropoff',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });
    }

    // Live driver marker
    if (hasDriver) {
      const pos = { lat: safeDriver.lat, lng: safeDriver.lng };
      driverMarkerRef.current = new google.maps.Marker({
        position: pos,
        map,
        title: 'Driver Live Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });
      map.setCenter(pos); // Center on driver for live view
    }

    // Directions
    if (hasPickup && hasDropoff) {
      const directionsService = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
      });

      directionsService.route(
        {
          origin: { lat: safePickup.lat, lng: safePickup.lng },
          destination: { lat: safeDropoff.lat, lng: safeDropoff.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRendererRef.current.setDirections(result);
          } else {
            console.warn('Directions failed:', status);
          }
        }
      );
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current)
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      if (pickupMarkerRef.current) pickupMarkerRef.current.setMap(null);
      if (dropoffMarkerRef.current) dropoffMarkerRef.current.setMap(null);
      if (driverMarkerRef.current) driverMarkerRef.current.setMap(null);
      if (directionsRendererRef.current)
        directionsRendererRef.current.setMap(null);
      if (clickListenerRef.current)
        google.maps.event.removeListener(clickListenerRef.current);
    };
  }, [
    isLoaded,
    pickup,
    dropoff,
    currentDriver,
    onPickupChange,
    onDropoffChange,
  ]);

  return (
    <div
      className={cn('border rounded relative', palette.border, palette.card)}
    >
      <div ref={mapRef} style={{ height, width: '100%' }} className="rounded" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className={cn('text-sm', palette.mutedText)}>
            Loading map...
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
