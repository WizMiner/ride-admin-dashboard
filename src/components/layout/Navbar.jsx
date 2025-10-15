import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Palette, Settings, Menu, X, Car, LogOut } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { cn } from '../../common/utils';
import { AuthContext } from '../../contexts/AuthContextDefinition';

const Navbar = ({ onMenuToggle, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { currentTheme, themes, changeTheme, previewTheme, resetTheme } =
    useTheme();
  const { auth, logout } = useContext(AuthContext);
  const palette = getPalette(currentTheme);
  const navigate = useNavigate();

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
    setShowThemeSelector(false);
  };

  const handleThemePreview = (themeKey) => {
    previewTheme(themeKey);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b',
        'border-theme',
        'bg-theme',
        'text-theme'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className={cn(
              'block lg:hidden btn btn-ghost p-2',
              'text-muted-theme'
            )}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'p-1 rounded-full flex items-center justify-center',
                palette.avatarBg
              )}
            >
              {/* <Car size={28} className="text-white" /> */}
              <div
                className={cn('rounded-full ', palette.avatarBg)}
                style={{ width: 34, height: 34 }}
              >
                <img
                  src="/logo.webp"
                  alt="Logo"
                  className="w-full h-full object-contain"
                  style={{ filter: palette.iconFilter }}
                />
              </div>
            </div>
            <span
              className={cn(
                'font-semibold text-lg hidden sm:block',
                'text-theme'
              )}
            >
              Daily Transport
            </span>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search
              className={cn(
                'absolute left-3 top-1/2 transform -translate-y-1/2',
                'text-muted-theme'
              )}
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'input pl-10 w-full',
                'bg-card',
                'text-theme',
                'border-theme',
                'placeholder:text-muted-theme'
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowThemeSelector((s) => !s)}
              className={cn('btn btn-ghost p-2', 'text-muted-theme')}
              aria-label="Change theme"
            >
              <Palette size={20} />
            </button>
            {showThemeSelector && (
              <div
                className={cn(
                  'absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg p-4',
                  'bg-card',
                  'border-theme',
                  'text-theme'
                )}
              >
                <h3 className="font-semibold mb-3">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => {
                    const themePalette = getPalette(t.key);
                    const isActive = currentTheme === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => handleThemeSelect(t.key)}
                        onMouseEnter={() => handleThemePreview(t.key)}
                        onMouseLeave={resetTheme}
                        type="button"
                        className={cn(
                          'flex items-center gap-2 p-2 rounded-md text-sm transition-colors',
                          isActive
                            ? themePalette.btnPrimary
                            : 'hover:opacity-95'
                        )}
                      >
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                          <div
                            className="w-full h-full rounded-full"
                            style={{
                              background:
                                'linear-gradient(45deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))',
                            }}
                          />
                        </div>
                        <span className="truncate">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-theme">
                  <p className="text-xs text-muted-theme">
                    Hover to preview, click to apply
                  </p>
                </div>
              </div>
            )}
          </div>
          {auth.isAuthenticated && (
            <button
              onClick={logout}
              className={cn('btn btn-ghost p-2', 'text-muted-theme')}
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
          {!auth.isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className={cn('btn btn-ghost p-2', 'text-muted-theme')}
              aria-label="Login"
            >
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
