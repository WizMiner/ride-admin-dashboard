// src/components/maps/LocationMap.jsx
import React, { useEffect, useRef } from 'react';
import { cn } from '../../common/utils';
import { defaultMapCenter } from '../../config/googleMaps';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const LocationMap = ({
  pickup,
  dropoff,
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
  const directionsRendererRef = useRef(null);
  const geocoderRef = useRef(null);
  const clickListenerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || typeof window.google === 'undefined')
      return;

    const { google } = window;

    // Cleanup previous instances
    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      mapInstanceRef.current = null;
    }
    if (pickupMarkerRef.current) {
      google.maps.event.clearInstanceListeners(pickupMarkerRef.current);
      pickupMarkerRef.current.setMap(null);
      pickupMarkerRef.current = null;
    }
    if (dropoffMarkerRef.current) {
      google.maps.event.clearInstanceListeners(dropoffMarkerRef.current);
      dropoffMarkerRef.current.setMap(null);
      dropoffMarkerRef.current = null;
    }
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    if (geocoderRef.current) {
      geocoderRef.current = null;
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

    // Click listener to set location if not set
    const handleMapClick = (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (!hasPickup) {
        // Set as pickup
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            let address = '';
            if (status === 'OK' && results[0]) {
              address = results[0].formatted_address;
            }
            if (onPickupChange) {
              onPickupChange({ latitude: lat, longitude: lng }, address);
            }
          }
        );
        hasPickup = true;
      } else if (!hasDropoff) {
        // Set as dropoff
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            let address = '';
            if (status === 'OK' && results[0]) {
              address = results[0].formatted_address;
            }
            if (onDropoffChange) {
              onDropoffChange({ latitude: lat, longitude: lng }, address);
            }
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
        title: 'Pickup Location',
        draggable: true,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        },
      });

      pickupMarkerRef.current.addListener('dragend', (e) => {
        const newPos = e.latLng;
        geocoderRef.current.geocode({ location: newPos }, (results, status) => {
          let address = '';
          if (status === 'OK' && results[0]) {
            address = results[0].formatted_address;
          }
          if (onPickupChange) {
            onPickupChange(
              { latitude: newPos.lat(), longitude: newPos.lng() },
              address
            );
          }
        });
      });

      map.setCenter(pos);
    }

    // Dropoff marker
    if (hasDropoff) {
      const pos = { lat: safeDropoff.lat, lng: safeDropoff.lng };
      dropoffMarkerRef.current = new google.maps.Marker({
        position: pos,
        map,
        title: 'Dropoff Location',
        draggable: true,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });

      dropoffMarkerRef.current.addListener('dragend', (e) => {
        const newPos = e.latLng;
        geocoderRef.current.geocode({ location: newPos }, (results, status) => {
          let address = '';
          if (status === 'OK' && results[0]) {
            address = results[0].formatted_address;
          }
          if (onDropoffChange) {
            onDropoffChange(
              { latitude: newPos.lat(), longitude: newPos.lng() },
              address
            );
          }
        });
      });
    }

    // Directions if both locations available
    if (hasPickup && hasDropoff) {
      const directionsService = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true, // Since we have custom markers
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
            console.warn('Directions request failed due to ' + status);
          }
        }
      );
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        mapInstanceRef.current = null;
      }
      if (pickupMarkerRef.current) {
        google.maps.event.clearInstanceListeners(pickupMarkerRef.current);
        pickupMarkerRef.current.setMap(null);
        pickupMarkerRef.current = null;
      }
      if (dropoffMarkerRef.current) {
        google.maps.event.clearInstanceListeners(dropoffMarkerRef.current);
        dropoffMarkerRef.current.setMap(null);
        dropoffMarkerRef.current = null;
      }
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      if (clickListenerRef.current) {
        google.maps.event.removeListener(clickListenerRef.current);
        clickListenerRef.current = null;
      }
      geocoderRef.current = null;
    };
  }, [isLoaded, pickup, dropoff, onPickupChange, onDropoffChange]);

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
