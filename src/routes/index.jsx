// src/routes/index.jsx
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
import Rides from '../pages/rides/Rides.jsx';
import Analytics from '../pages/dashboard/Analytics.jsx';
import Reports from '../pages/Reports.jsx';
import Insights from '../pages/Insights.jsx';
import Notifications from '../pages/Notifications.jsx';
import Settings from '../pages/Settings.jsx';
import Security from '../pages/Security.jsx';
import Help from '../pages/Help.jsx';

import Bookings from '../pages/booking/Bookings.jsx';
import Trips from '../pages/trip/Trips.jsx';
import Payments from '../pages/Payment/Payments.jsx';
import Pricing from '../pages/pricing/Pricing.jsx';
import Wallet from '../pages/wallet/Wallets.jsx';
import Live from '../pages/live/Live.jsx';
import Assignments from '../pages/assignment/Assignments.jsx';

import Contracts from '../pages/contract/Contracts.jsx';
import Subscriptions from '../pages/subscriptions/SubscriptionList.jsx';

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
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Admins />
          </ProtectedRoute>
        ),
      },
      {
        path: 'roles',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'staff']}>
            <Roles />
          </ProtectedRoute>
        ),
      },
      {
        path: 'staffs',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Staffs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'drivers',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'staff']}>
            <Drivers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'passengers',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'staff']}>
            <Passengers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'permissions',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Permissions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Bookings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'assignments',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Assignments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trips',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Trips />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payments',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'pricing',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Pricing />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wallets',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Wallet />
          </ProtectedRoute>
        ),
      },
      {
        path: 'rides',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Rides />
          </ProtectedRoute>
        ),
      },
      {
        path: 'lives',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Live />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contracts',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Contracts />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Subscriptions',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'staff', 'superadmin']}>
            <Subscriptions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reports',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'staff']}>
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
        path: 'help',
        element: (
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute requireSuperAdmin>
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
    ],
  },
]);
