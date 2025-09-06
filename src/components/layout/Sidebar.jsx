import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Car,
  MapPin,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';
import { AuthContext } from '../../contexts/AuthContextDefinition';
import { useContext } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const [expandedGroups, setExpandedGroups] = React.useState({
    dashboard: true,
    management: true,
    analytics: true,
    system: true,
  });

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const menuItems = [
    {
      group: 'dashboard',
      title: 'Dashboard',
      items: [
        { path: '/', label: 'Overview', icon: Home },
        { path: '/analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      group: 'management',
      title: 'Management',
      items: [
        { path: '/users', label: 'Users', icon: Users },
        { path: '/drivers', label: 'Drivers', icon: Car },
        { path: '/rides', label: 'Rides', icon: MapPin },
        { path: '/payments', label: 'Payments', icon: CreditCard },
      ],
    },
    {
      group: 'analytics',
      title: 'Analytics',
      items: [
        { path: '/reports', label: 'Reports', icon: FileText },
        { path: '/insights', label: 'Insights', icon: BarChart3 },
      ],
    },
    {
      group: 'system',
      title: 'System',
      items: [
        { path: '/notifications', label: 'Notifications', icon: Bell },
        ...(auth.isSuperAdmin
          ? [
              { path: '/settings', label: 'Settings', icon: Settings },
              { path: '/security', label: 'Security', icon: Shield },
            ]
          : []),
        { path: '/help', label: 'Help & Support', icon: HelpCircle },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 w-64 z-40 transform transition-transform duration-300 ease-in-out',
          palette.sidebarBg,
          'border-r',
          palette.sidebarBorder,
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full lg:h-screen">
          <div className={cn('p-4', 'border-b', palette.sidebarBorder)}>
            <h2
              className={cn(
                'font-semibold text-sm uppercase tracking-wider',
                palette.sidebarMuted
              )}
            >
              Navigation
            </h2>
          </div>
          <nav
            className={cn(
              'flex-1 overflow-y-auto p-4 space-y-2',
              palette.sidebarBg
            )}
          >
            {menuItems.map((group) => (
              <div key={group.group} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.group)}
                  className={cn(
                    'flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors',
                    palette.sidebarText
                  )}
                  type="button"
                >
                  <span>{group.title}</span>
                  {expandedGroups[group.group] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedGroups[group.group] && (
                  <div className="space-y-1 ml-2">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                            palette.sidebarText,
                            palette.sidebarHoverBg,
                            active && palette.sidebarActiveBg,
                            active && palette.sidebarActiveText
                          )}
                        >
                          <Icon size={18} />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className={cn('p-4', 'border-t', palette.sidebarBorder)}>
            <div
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg',
                'bg-opacity-40',
                palette.sidebarBg
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  palette.avatarBg
                )}
              >
                <span className="text-white font-semibold text-sm">
                  {auth.admin?.fullName?.[0] || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', palette.text)}>
                  {auth.admin?.fullName || 'Admin User'}
                </p>
                <p className={cn('text-xs truncate', palette.sidebarMuted)}>
                  {auth.admin?.email ||
                    auth.admin?.username ||
                    'admin@ride.com'}
                </p>
              </div>
              <button
                onClick={logout}
                className={cn('p-2', 'text-muted-theme', 'hover-theme')}
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
