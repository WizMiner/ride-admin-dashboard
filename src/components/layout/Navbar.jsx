import React, { useState } from 'react';
import { Search, Palette, Settings, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { cn } from '../../common/utils';

// Theme color mapping
const getThemeColors = (themeName) => {
  const colorMap = {
    default: { primary: 'blue-600', primaryHover: 'blue-700', primaryLight: 'blue-100' },
    dark: { primary: 'blue-500', primaryHover: 'blue-600', primaryLight: 'blue-900' },
    green: { primary: 'green-600', primaryHover: 'green-700', primaryLight: 'green-100' },
    purple: { primary: 'purple-600', primaryHover: 'purple-700', primaryLight: 'purple-100' },
    red: { primary: 'red-600', primaryHover: 'red-700', primaryLight: 'red-100' },
    orange: { primary: 'orange-600', primaryHover: 'orange-700', primaryLight: 'orange-100' },
    teal: { primary: 'teal-600', primaryHover: 'teal-700', primaryLight: 'teal-100' },
    indigo: { primary: 'indigo-600', primaryHover: 'indigo-700', primaryLight: 'indigo-100' },
    rose: { primary: 'rose-600', primaryHover: 'rose-700', primaryLight: 'rose-100' },
    emerald: { primary: 'emerald-600', primaryHover: 'emerald-700', primaryLight: 'emerald-100' }
  };
  return colorMap[themeName] || colorMap.default;
};

const Navbar = ({ onMenuToggle, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { currentTheme, themes, changeTheme, previewTheme, resetTheme } = useTheme();
  
  const colors = getThemeColors(currentTheme);

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
    setShowThemeSelector(false);
  };

  const handleThemePreview = (themeKey) => {
    previewTheme(themeKey);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="btn btn-ghost p-2 lg:hidden"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", `bg-${colors.primary}`)}>
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Ride Admin</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Right side - Theme selector and Settings */}
        <div className="flex items-center gap-2">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="btn btn-ghost p-2"
              aria-label="Change theme"
            >
              <Palette size={20} />
            </button>
            
            {showThemeSelector && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <h3 className="font-semibold mb-3">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => handleThemeSelect(theme.key)}
                      onMouseEnter={() => handleThemePreview(theme.key)}
                      onMouseLeave={resetTheme}
                                              className={cn(
                          "flex items-center gap-2 p-2 rounded-md text-sm transition-colors",
                          currentTheme === theme.key
                            ? cn(`bg-${colors.primary} text-white`)
                            : "hover:bg-gray-100"
                        )}
                    >
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex">
                        <div 
                          className="w-full h-full rounded-full"
                          style={{
                            background: `linear-gradient(45deg, hsl(var(--primary-500)), hsl(var(--secondary-500)), hsl(var(--accent-500)))`
                          }}
                        />
                      </div>
                      {theme.name}
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Hover to preview, click to apply
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="btn btn-ghost p-2" aria-label="Settings">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
