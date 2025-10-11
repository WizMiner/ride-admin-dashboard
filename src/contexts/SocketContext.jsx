// src/contexts/SocketContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth'; // Updated import

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const mountedRef = useRef(true);
  const connectingRef = useRef(false);
  const lastConnectAttempt = useRef(0);
  const hasAttemptedOpsJoinRef = useRef(false);
  const socketInstanceRef = useRef(null);

  mountedRef.current = true;

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      connectingRef.current = false;
      lastConnectAttempt.current = 0;
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🔁 Auth state changed:', {
        isAuthenticated: auth.isAuthenticated,
        hasToken: !!auth.token,
        loading: auth.loading,
      });
    }
  }, [auth]);

  const connectSocket = useCallback(async () => {
    if (import.meta.env.DEV) {
      console.log('🔍 connectSocket entry — checking guards:', {
        loading: auth.loading,
        hasToken: !!auth.token,
        mounted: mountedRef.current,
        connecting: connectingRef.current,
      });
    }

    if (
      auth.loading ||
      !auth.token ||
      !mountedRef.current ||
      connectingRef.current
    ) {
      if (import.meta.env.DEV) {
        if (!auth.token) {
          console.warn('⚠️ No identity token found — socket not connecting.');
        } else if (connectingRef.current) {
          console.log('⏳ Connect already in progress — skipping duplicate.');
        } else if (auth.loading) {
          console.log('⏳ Auth still loading — skipping.');
        } else if (!mountedRef.current) {
          console.log('⚠️ Component unmounted — skipping.');
        }
      }
      return;
    }

    const now = Date.now();
    if (now - lastConnectAttempt.current < 1000) {
      console.log('⏳ Connect debounced — too soon.');
      return;
    }
    lastConnectAttempt.current = now;

    if (socketInstanceRef.current && socketInstanceRef.current.connected) {
      console.log('🔄 Disconnecting old socket before new connect');
      socketInstanceRef.current.disconnect();
    }

    connectingRef.current = true;
    const serverUrl = import.meta.env.VITE_SOCKET_SERVER;
    if (import.meta.env.DEV) {
      console.log(
        '🌐 Connecting to server URL:',
        serverUrl || 'UNDEFINED (check .env!)'
      );
      console.log(
        '✅ Identity token exists:',
        auth.token.substring(0, 20) + '...'
      );
    }

    try {
      const newSocket = io(serverUrl, {
        auth: { token: auth.token },
        transports: ['polling', 'websocket'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        forceNew: true,
        query: { t: Date.now() },
      });

      socketInstanceRef.current = newSocket;

      newSocket.on('connect', () => {
        if (mountedRef.current) {
          const transport = newSocket.io.engine.transport.name;
          setIsConnected(true);
          setIsPolling(transport === 'polling');
          connectingRef.current = false;
          if (import.meta.env.DEV) {
            console.log(
              '🔌 Socket connected via',
              transport,
              ':',
              newSocket.id
            );
          }
        }
      });

      newSocket.on('disconnect', (reason) => {
        if (mountedRef.current) {
          setIsConnected(false);
          setIsPolling(false);
          connectingRef.current = false;
          if (import.meta.env.DEV) {
            console.log('❌ Socket disconnected (reason:', reason, ')');
          }
          if (socketInstanceRef.current === newSocket) {
            socketInstanceRef.current = null;
          }
        }
      });

      newSocket.on('connect_error', (error) => {
        console.error('🚨 Connect error:', error.message || error);
        connectingRef.current = false;
        setTimeout(() => connectSocket(), 2000);
      });

      newSocket.on('booking_error', (error) => {
        console.error('🚨 Socket error:', error);
        connectingRef.current = false;
      });

      newSocket.on('auth_error', (error) => {
        console.error('🚨 Auth error:', error);
        connectingRef.current = false;
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('❌ Failed to create socket:', error);
      connectingRef.current = false;
    }
  }, [auth.token, auth.loading]);

  const disconnectSocket = useCallback(() => {
    if (import.meta.env.DEV) console.log('🔌 disconnectSocket called');
    if (socketInstanceRef.current) {
      socketInstanceRef.current.disconnect();
      socketInstanceRef.current = null;
      setSocket(null);
    }
    connectingRef.current = false;
    lastConnectAttempt.current = 0;
    hasAttemptedOpsJoinRef.current = false;
    setIsConnected(false);
    setIsPolling(false);
    if (import.meta.env.DEV)
      console.log('🔌 Socket disconnected manually + refs reset');
  }, []);

  const joinRoom = useCallback(
    async (roomName) => {
      if (!socket || !isConnected) {
        console.warn('Cannot join room: socket not connected');
        return false;
      }

      if (roomName === 'ops:booking' && hasAttemptedOpsJoinRef.current) {
        console.warn('⏩ Skipping retry for ops:booking (already attempted)');
        return false;
      }

      setIsJoiningRoom(true);
      try {
        if (import.meta.env.DEV)
          console.log(`🛡️ Attempting to join room: ${roomName}`);
        const payload = roomName.startsWith('booking:')
          ? { room: roomName, bookingId: roomName.replace('booking:', '') }
          : { room: roomName, bookingId: null };
        socket.emit('booking:join_room', payload);

        if (roomName === 'ops:booking') {
          hasAttemptedOpsJoinRef.current = true;
        }

        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
            socket.off('booking:joined', onJoined);
            socket.off('booking_error', onError);
            console.warn(`⏰ Join timeout for ${roomName}`);
            resolve(false);
            setIsJoiningRoom(false);
          }, 5000);

          const onJoined = () => {
            clearTimeout(timeout);
            socket.off('booking_error', onError);
            if (import.meta.env.DEV) console.log(`✅ Joined room: ${roomName}`);
            if (roomName === 'ops:booking') {
              hasAttemptedOpsJoinRef.current = false;
            }
            resolve(true);
            setIsJoiningRoom(false);
          };

          const onError = (error) => {
            clearTimeout(timeout);
            socket.off('booking:joined', onJoined);
            console.error(`❌ Failed to join room ${roomName}:`, error);
            if (roomName === 'ops:booking') {
              console.warn(
                '⚠️ Ops room join failed — using broadcasts for global events'
              );
            }
            resolve(false);
            setIsJoiningRoom(false);
          };

          socket.once('booking:joined', onJoined);
          socket.once('booking_error', onError);
        });
      } catch (error) {
        console.error('Error joining room:', error);
        setIsJoiningRoom(false);
        return false;
      }
    },
    [socket, isConnected]
  );

  const leaveRoom = useCallback(
    (roomName) => {
      if (socket) {
        const payload = roomName.startsWith('booking:')
          ? { room: roomName, bookingId: roomName.replace('booking:', '') }
          : { room: roomName, bookingId: null };
        socket.emit('leave_room', payload);
        if (import.meta.env.DEV) console.log(`🚪 Left room: ${roomName}`);
      }
    },
    [socket]
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🧠 Auto-connect check:', {
        isAuthenticated: auth.isAuthenticated,
        hasToken: !!auth.token,
        loading: auth.loading,
      });
    }
    if (auth.isAuthenticated && auth.token && !auth.loading) {
      connectSocket();
    } else if (!auth.isAuthenticated || !auth.token) {
      disconnectSocket();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.isAuthenticated,
    auth.token,
    auth.loading,
    disconnectSocket,
    connectSocket,
  ]); // Stable callbacks ensure no unnecessary re-runs

  const value = {
    socket,
    isConnected,
    isPolling,
    isJoiningRoom,
    joinRoom,
    leaveRoom,
    connectSocket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
