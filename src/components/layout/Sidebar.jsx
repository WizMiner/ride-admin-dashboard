import React from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { cn } from "../../common/utils";
import { useTheme } from "../../hooks/useTheme.jsx";

// Theme color mapping
const getThemeColors = (themeName) => {
  const colorMap = {
    default: {
      primary: "blue-600",
      primaryHover: "blue-700",
      primaryLight: "blue-100",
    },
    dark: {
      primary: "blue-500",
      primaryHover: "blue-600",
      primaryLight: "blue-900",
    },
    green: {
      primary: "green-600",
      primaryHover: "green-700",
      primaryLight: "green-100",
    },
    purple: {
      primary: "purple-600",
      primaryHover: "purple-700",
      primaryLight: "purple-100",
    },
    red: {
      primary: "red-600",
      primaryHover: "red-700",
      primaryLight: "red-100",
    },
    orange: {
      primary: "orange-600",
      primaryHover: "orange-700",
      primaryLight: "orange-100",
    },
    teal: {
      primary: "teal-600",
      primaryHover: "teal-700",
      primaryLight: "teal-100",
    },
    indigo: {
      primary: "indigo-600",
      primaryHover: "indigo-700",
      primaryLight: "indigo-100",
    },
    rose: {
      primary: "rose-600",
      primaryHover: "rose-700",
      primaryLight: "rose-100",
    },
    emerald: {
      primary: "emerald-600",
      primaryHover: "emerald-700",
      primaryLight: "emerald-100",
    },
  };
  return colorMap[themeName] || colorMap.default;
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { currentTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  const [expandedGroups, setExpandedGroups] = React.useState({
    dashboard: true,
    management: true,
    analytics: true,
    system: true,
  });

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const menuItems = [
    {
      group: "dashboard",
      title: "Dashboard",
      items: [
        { path: "/", label: "Overview", icon: Home },
        { path: "/analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      group: "management",
      title: "Management",
      items: [
        { path: "/users", label: "Users", icon: Users },
        { path: "/drivers", label: "Drivers", icon: Car },
        { path: "/rides", label: "Rides", icon: MapPin },
        { path: "/payments", label: "Payments", icon: CreditCard },
      ],
    },
    {
      group: "analytics",
      title: "Analytics",
      items: [
        { path: "/reports", label: "Reports", icon: FileText },
        { path: "/insights", label: "Insights", icon: BarChart3 },
      ],
    },
    {
      group: "system",
      title: "System",
      items: [
        { path: "/notifications", label: "Notifications", icon: Bell },
        { path: "/settings", label: "Settings", icon: Settings },
        { path: "/security", label: "Security", icon: Shield },
        { path: "/help", label: "Help & Support", icon: HelpCircle },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full lg:h-screen">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">
              Navigation
            </h2>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((group) => (
              <div key={group.group} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <span>{group.title}</span>
                  {expandedGroups[group.group] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {/* Group Items */}
                {expandedGroups[group.group] && (
                  <div className="space-y-1 ml-2">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={cn(
                            "sidebar-item",
                            isActive(item.path) && "active"
                          )}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  `bg-${colors.primary}`
                )}
              >
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@ride.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
