import { cn } from "../common/utils";

const Settings = () => (
  <div className={cn("space-y-6", "text-theme")}>
    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
    <p className="text-muted-foreground">
      Configure system settings and preferences.
    </p>
    <div className={cn("card p-6", "bg-card")}>
      <p className="text-center text-muted-foreground">
        Settings page coming soon...
      </p>
    </div>
  </div>
);

export default Settings;
