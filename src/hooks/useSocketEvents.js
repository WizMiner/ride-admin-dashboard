// src/hooks/useSocketEvents.js
import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useToast } from './useToast';

export const useSocketEvents = (events = {}, onEvent = () => {}) => {
  const { socket, isConnected } = useSocket();
  const { addToast } = useToast();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handlers = {
      'booking:update': (payload) => onEvent('bookingUpdate', payload),
      'trip:started': (payload) => onEvent('tripStarted', payload),
      'trip:ongoing': (payload) => onEvent('tripOngoing', payload),
      'trip:completed': (payload) => onEvent('tripCompleted', payload),
      'booking:driver_location': (payload) =>
        onEvent('driverLocation', payload),
      'pricing:update': (payload) => onEvent('pricingUpdate', payload),
      'booking:ETA_update': (payload) => onEvent('etaUpdate', payload),
      booking_error: (error) => {
        console.error('Booking error:', error);
        addToast(error.message || 'Booking error occurred', 'error');
      },
      auth_error: (error) => {
        console.error('Auth error:', error);
        addToast('Authentication failed', 'error');
      },
      ...events, // Custom handlers
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, isConnected, events, onEvent, addToast]);
};
