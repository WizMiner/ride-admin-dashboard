// src/hooks/useSocket.js
import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

/**
 * Custom hook to access socket state and methods.
 * @returns {Object} - { socket, isConnected, isPolling, isJoiningRoom, joinRoom, leaveRoom, connectSocket }
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};
