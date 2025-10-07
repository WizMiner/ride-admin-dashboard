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

  // 🧹 Logout clears all authentication data
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

  // 🧠 Initialize authentication from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));

        // Normalize roles from JWT
        let normalizedRoles = [];
        if (decoded.roles && decoded.roles.length > 0) {
          normalizedRoles = decoded.roles;
        } else if (decoded.type) {
          normalizedRoles = [decoded.type]; // fallback for simple tokens
        }

        const isSuperAdmin = normalizedRoles.includes('superadmin');
        const permissions = decoded.permissions || [];

        setAuth({
          token: storedToken,
          user: JSON.parse(storedUser),
          roles: normalizedRoles,
          isAuthenticated: true,
          isSuperAdmin,
          permissions,
          loading: false,
        });
      } catch (error) {
        console.error('Token invalid or malformed:', error);
        logout();
      }
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, [logout]);

  const login = async (username, password, userType = 'admin') => {
    try {
      // choose endpoint
      const endpoint =
        userType === 'staff'
          ? '/api/auth/staff/login'
          : '/api/auth/admin/login';

      const { data } = await api.post(endpoint, { username, password });

      if (!data?.token) {
        return {
          success: false,
          message: data?.message || 'Invalid credentials',
        };
      }

      const decoded = JSON.parse(atob(data.token.split('.')[1]));

      // Normalize roles
      let normalizedRoles = [];
      if (decoded.roles && decoded.roles.length > 0) {
        normalizedRoles = decoded.roles;
      } else if (decoded.type) {
        normalizedRoles = [decoded.type];
      }

      const isSuperAdmin = normalizedRoles.includes('superadmin');
      const userData = data.admin || data.staff || null;

      // Persist to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('roles', JSON.stringify(normalizedRoles));

      // Update state
      setAuth({
        token: data.token,
        user: userData,
        roles: normalizedRoles,
        isAuthenticated: true,
        isSuperAdmin,
        permissions: decoded.permissions || [],
        loading: false,
      });

      return { success: true, roles: normalizedRoles };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {/* Render children only after auth check */}
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};
