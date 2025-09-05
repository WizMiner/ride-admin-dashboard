import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Users from "../pages/Users.jsx";
import Drivers from "../pages/Drivers.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Rides from "../pages/Rides.jsx";
import Payments from "../pages/Payments.jsx";
import Analytics from "../pages/Analytics.jsx";
import Reports from "../pages/Reports.jsx";
import Insights from "../pages/Insights.jsx";
import Notifications from "../pages/Notifications.jsx";
import Settings from "../pages/Settings.jsx";
import Security from "../pages/Security.jsx";
import Help from "../pages/Help.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
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
        path: "analytics",
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "drivers",
        element: (
          <ProtectedRoute>
            <Drivers />
          </ProtectedRoute>
        ),
      },
      {
        path: "rides",
        element: (
          <ProtectedRoute>
            <Rides />
          </ProtectedRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: "insights",
        element: (
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute requireSuperAdmin>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "security",
        element: (
          <ProtectedRoute requireSuperAdmin>
            <Security />
          </ProtectedRoute>
        ),
      },
      {
        path: "help",
        element: (
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
