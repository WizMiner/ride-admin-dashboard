import { createContext, useContext, useState, useEffect } from "react";
import { themes, applyTheme, getThemeList } from "../common/themes";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // currentTheme drives what components render (and what getPalette returns)
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("ride-admin-theme");
    const themeToApply =
      savedTheme && themes[savedTheme] ? savedTheme : "default";
    setCurrentTheme(themeToApply);
    applyTheme(themeToApply);
    // console.debug("[ThemeProvider] mounted — applying theme:", themeToApply);
    setIsLoading(false);
  }, []);

  // Persisted change: set current theme and save
  const changeTheme = (themeName) => {
    if (!themes[themeName]) return;
    // console.debug("[ThemeProvider] changeTheme ->", themeName);
    setCurrentTheme(themeName);
    applyTheme(themeName);
    localStorage.setItem("ride-admin-theme", themeName);
  };

  // Preview without saving: updates currentTheme so components show it,
  // but DOES NOT write to localStorage (hover preview behavior)
  const previewTheme = (themeName) => {
    if (!themes[themeName]) return;
    // console.debug("[ThemeProvider] previewTheme ->", themeName);
    setCurrentTheme(themeName);
    applyTheme(themeName);
  };

  // Reset to saved theme (or default)
  const resetTheme = () => {
    const savedTheme = localStorage.getItem("ride-admin-theme") || "default";
    // console.debug("[ThemeProvider] resetTheme ->", savedTheme);
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
