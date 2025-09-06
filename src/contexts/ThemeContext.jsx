import { createContext, useState, useEffect } from 'react';
import { themes, applyTheme, getThemeList } from '../common/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('ride-admin-theme');
    const themeToApply =
      savedTheme && themes[savedTheme] ? savedTheme : 'default';
    setCurrentTheme(themeToApply);
    applyTheme(themeToApply);
    setIsLoading(false);
  }, []);

  const changeTheme = (themeName) => {
    if (!themes[themeName]) return;
    setCurrentTheme(themeName);
    applyTheme(themeName);
    localStorage.setItem('ride-admin-theme', themeName);
  };

  const previewTheme = (themeName) => {
    if (!themes[themeName]) return;
    setCurrentTheme(themeName);
    applyTheme(themeName);
  };

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
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext };
