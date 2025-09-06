import { cn } from '../common/utils';

const Notifications = () => (
  <div className={cn('space-y-6', 'text-theme')}>
    <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
    <p className="text-muted-foreground">
      Manage system notifications and alerts.
    </p>
    <div className={cn('card p-6', 'bg-card')}>
      <p className="text-center text-muted-foreground">
        Notifications page coming soon...
      </p>
    </div>
  </div>
);

export default Notifications;
