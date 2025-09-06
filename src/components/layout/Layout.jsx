import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
// import { useTheme } from '../../hooks/useTheme.jsx';
import { cn } from '../../common/utils';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { currentTheme } = useTheme();

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    // top-level uses CSS-variable-driven utilities so background/text follow theme
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        'bg-theme',
        'text-theme'
      )}
    >
      <Navbar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="min-h-screen transition-all duration-300 lg:ml-64">
        {/* content container uses card/bg utilities so it flips in dark mode */}
        <div className={cn('p-6 mt-16', 'bg-theme', 'text-theme')}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
