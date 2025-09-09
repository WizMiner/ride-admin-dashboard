//src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import Layout from '../components/layout/Layout.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Admins from '../pages/admin/Admins.jsx';
import Passengers from '../pages/passenger/Passengers.jsx';
import Drivers from '../pages/driver/Drivers.jsx';
import Staffs from '../pages/staff/Staffs.jsx';
import Roles from '../pages/role/Roles.jsx';
import Permissions from '../pages/permission/Permissions.jsx';
import Rides from '../pages/Rides.jsx';
import Payments from '../pages/Payments.jsx';
import Analytics from '../pages/dashboard/Analytics.jsx';
import Reports from '../pages/Reports.jsx';
import Insights from '../pages/Insights.jsx';
import Notifications from '../pages/Notifications.jsx';
import Settings from '../pages/Settings.jsx';
import Security from '../pages/Security.jsx';
import Help from '../pages/Help.jsx';

import Bookings from '../pages/booking/Bookings';
import Trips from '../pages/trip/Trips';
import Pricing from '../pages/pricing/Pricing.jsx';
import Live from '../pages/live/Live.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admins',
        element: (
          <ProtectedRoute>
            <Admins />
          </ProtectedRoute>
        ),
      },
      {
        path: 'passengers',
        element: (
          // <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
          <ProtectedRoute>
            <Passengers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'drivers',
        element: (
          <ProtectedRoute>
            <Drivers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'staffs',
        element: (
          <ProtectedRoute>
            <Staffs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'roles',
        element: (
          <ProtectedRoute>
            <Roles />
          </ProtectedRoute>
        ),
      },
      {
        path: 'permissions',
        element: (
          <ProtectedRoute>
            <Permissions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'rides',
        element: (
          <ProtectedRoute>
            <Rides />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payments',
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trips',
        element: (
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        ),
      },
      {
        path: 'pricing',
        element: (
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        ),
      },
      {
        path: 'lives',
        element: (
          <ProtectedRoute>
            <Live />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reports',
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: 'insights',
        element: (
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        ),
      },
      {
        path: 'notifications',
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'security',
        element: (
          <ProtectedRoute requireSuperAdmin>
            <Security />
          </ProtectedRoute>
        ),
      },
      {
        path: 'help',
        element: (
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
