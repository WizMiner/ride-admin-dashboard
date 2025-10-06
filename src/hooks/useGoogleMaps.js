// src/hooks/useGoogleMaps.js
import { useEffect, useState } from 'react';
import { googleMapsApiKey } from '../config/googleMaps';

let mapsLoadPromise = null;
let isMapsLoaded = false;

const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (isMapsLoaded && window.google && window.google.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript) {
      const checkLoaded = () => {
        if (window.google && window.google.maps) {
          isMapsLoaded = true;
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,places,marker&l=async`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    script.onload = () => {
      isMapsLoaded = true;
      resolve();
    };

    document.head.appendChild(script);
  });
};

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    setIsLoading(true);
    if (!mapsLoadPromise) {
      mapsLoadPromise = loadGoogleMaps().catch((err) => {
        console.error('Failed to load Google Maps:', err);
        mapsLoadPromise = null; // Allow retry
      });
    }

    mapsLoadPromise
      .then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [isLoaded]);

  return { isLoaded, isLoading };
};

export default useGoogleMaps;
