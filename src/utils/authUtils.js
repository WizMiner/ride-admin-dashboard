// Utility functions for Auth
export const getToken = () => localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};
