import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Users from "../pages/Users.jsx";
import Drivers from "../pages/Drivers.jsx";

// Placeholder components for other routes
const Rides = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Rides</h1>
    <p className="text-muted-foreground">
      Manage and monitor ride requests and completions.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Rides management page coming soon...
      </p>
    </div>
  </div>
);

const Payments = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Payments</h1>
    <p className="text-muted-foreground">
      Track and manage payment transactions.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Payments management page coming soon...
      </p>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
    <p className="text-muted-foreground">
      View detailed analytics and insights.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Analytics page coming soon...
      </p>
    </div>
  </div>
);

const Reports = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Reports</h1>
    <p className="text-muted-foreground">Generate and view various reports.</p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Reports page coming soon...
      </p>
    </div>
  </div>
);

const Insights = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Insights</h1>
    <p className="text-muted-foreground">
      Business insights and recommendations.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Insights page coming soon...
      </p>
    </div>
  </div>
);

const Notifications = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
    <p className="text-muted-foreground">
      Manage system notifications and alerts.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Notifications page coming soon...
      </p>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
    <p className="text-muted-foreground">
      Configure system settings and preferences.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Settings page coming soon...
      </p>
    </div>
  </div>
);

const Security = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Security</h1>
    <p className="text-muted-foreground">
      Manage security settings and access controls.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Security page coming soon...
      </p>
    </div>
  </div>
);

const Help = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
    <p className="text-muted-foreground">
      Get help and support for the admin dashboard.
    </p>
    <div className="card p-6">
      <p className="text-center text-muted-foreground">
        Help & Support page coming soon...
      </p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "rides",
        element: <Rides />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "insights",
        element: <Insights />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);
