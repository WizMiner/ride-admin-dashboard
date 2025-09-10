// src/contexts/AuthContext.jsx
import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContextDefinition';
import api from '../services/auth';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    isAuthenticated: false,
    isSuperAdmin: false,
    permissions: [],
    loading: true,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    setAuth({
      token: null,
      user: null,
      roles: [],
      isAuthenticated: false,
      isSuperAdmin: false,
      permissions: [],
      loading: false,
    });
  }, []);

  // Initialize on load (decode JWT)
  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = JSON.parse(atob(auth.token.split('.')[1]));

        // Normalize roles
        let normalizedRoles = [];
        if (decoded.roles && decoded.roles.length > 0) {
          normalizedRoles = decoded.roles; // e.g. ["superadmin"]
        } else if (decoded.type) {
          normalizedRoles = [decoded.type]; // fallback (admin / staff)
        }

        const isSuperAdmin = normalizedRoles.includes('superadmin');
        const permissions = decoded.permissions || [];

        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          isSuperAdmin,
          permissions,
          roles: normalizedRoles,
          loading: false,
        }));
      } catch (error) {
        console.error('Token invalid:', error);
        logout();
      }
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, [auth.token, logout]);

  const login = async (username, password, userType = 'admin') => {
    try {
      // choose endpoint
      const endpoint =
        userType === 'staff' ? '/auth/staff/login' : '/auth/admin/login';
      const { data } = await api.post(endpoint, { username, password });

      if (data.token) {
        const decoded = JSON.parse(atob(data.token.split('.')[1]));

        // normalize roles
        let normalizedRoles = [];
        if (decoded.roles && decoded.roles.length > 0) {
          normalizedRoles = decoded.roles;
        } else if (decoded.type) {
          normalizedRoles = [decoded.type];
        }

        const isSuperAdmin = normalizedRoles.includes('superadmin');

        // save
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.admin || data.staff));
        localStorage.setItem('roles', JSON.stringify(normalizedRoles));

        setAuth({
          token: data.token,
          user: data.admin || data.staff,
          roles: normalizedRoles,
          isAuthenticated: true,
          isSuperAdmin,
          permissions: decoded.permissions || [],
          loading: false,
        });

        return { success: true, roles: normalizedRoles };
      }

      return { success: false, message: data.message || 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
