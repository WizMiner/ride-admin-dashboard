import { cn } from '../common/utils';

const Help = () => (
  <div className={cn('space-y-6', 'text-theme')}>
    <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
    <p className="text-muted-foreground">
      Get help and support for the admin dashboard.
    </p>
    <div className={cn('card p-6', 'bg-card')}>
      <p className="text-center text-muted-foreground">
        Help & Support page coming soon...
      </p>
    </div>
  </div>
);

export default Help;
