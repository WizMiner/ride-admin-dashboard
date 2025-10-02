import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import ErrorBoundary from '../ui/ErrorBoundary.jsx';
import { cn } from '../../common/utils';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
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
        <div className={cn('p-6 mt-16', 'bg-theme', 'text-theme')}>
          {/* Wrap Outlet with ErrorBoundary keyed to location.pathname */}
          <ErrorBoundary key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default Layout;
