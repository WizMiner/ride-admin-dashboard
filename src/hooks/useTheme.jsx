import { createContext, useContext, useState, useEffect } from 'react';
import { themes, applyTheme, getThemeList } from '../common/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ride-admin-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('default');
    }
    setIsLoading(false);
  }, []);

  // Apply theme and save to localStorage
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      applyTheme(themeName);
      localStorage.setItem('ride-admin-theme', themeName);
    }
  };

  // Preview theme without saving
  const previewTheme = (themeName) => {
    if (themes[themeName]) {
      applyTheme(themeName);
    }
  };

  // Reset to saved theme
  const resetTheme = () => {
    const savedTheme = localStorage.getItem('ride-admin-theme') || 'default';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  };

  const value = {
    currentTheme,
    changeTheme,
    previewTheme,
    resetTheme,
    themes: getThemeList(),
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
