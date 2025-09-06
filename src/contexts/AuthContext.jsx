import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContextDefinition';
import api from '../services/authapi';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    admin: JSON.parse(localStorage.getItem('admin') || 'null'),
    isAuthenticated: false,
    isSuperAdmin: false,
    permissions: [],
    loading: true,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAuth({
      token: null,
      admin: null,
      isAuthenticated: false,
      isSuperAdmin: false,
      permissions: [],
      loading: false,
    });
  }, []);

  // Initialize on load
  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = JSON.parse(atob(auth.token.split('.')[1]));
        const isSuperAdmin = decoded.roles?.includes('superadmin') || false;
        const permissions = decoded.permissions || [];
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          isSuperAdmin,
          permissions,
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

  const login = async (username, password) => {
    try {
      const { data } = await api.post('/auth/admin/login', {
        username,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));

        const isSuperAdmin =
          data.admin.roles?.some(
            (role) => role.name === 'superadmin' || role === 'superadmin'
          ) || false;

        const permissions =
          data.admin.roles?.flatMap(
            (role) => role.permissions?.map((p) => p.name) || []
          ) || [];

        setAuth({
          token: data.token,
          admin: data.admin,
          isAuthenticated: true,
          isSuperAdmin,
          permissions,
          loading: false,
        });

        return { success: true };
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
