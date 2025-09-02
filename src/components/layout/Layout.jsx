// Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar (overlay on mobile, static on desktop) */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content */}
      <main
        className={`
          min-h-screen transition-all duration-300
          ${isSidebarOpen ? "ml-0" : "ml-0"} 
          lg:ml-64                           
        `}
      >
        <div className="p-6 mt-16">
          {" "}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
