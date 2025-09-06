import { cn } from '../common/utils';

const Analytics = () => (
  <div className={cn('space-y-6', 'text-theme')}>
    <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
    <p className="text-muted-foreground">
      View detailed analytics and insights.
    </p>
    <div className={cn('card p-6', 'bg-card')}>
      <p className="text-center text-muted-foreground">
        Analytics page coming soon...
      </p>
    </div>
  </div>
);

export default Analytics;
