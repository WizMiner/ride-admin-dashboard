import { cn } from '../common/utils';

const Rides = () => (
  <div className={cn('space-y-6', 'text-theme')}>
    <h1 className="text-3xl font-bold text-foreground">Rides</h1>
    <p className="text-muted-foreground">
      Manage and monitor ride requests and completions.
    </p>
    <div className={cn('card p-6', 'bg-card')}>
      <p className="text-center text-muted-foreground">
        Rides management page coming soon...
      </p>
    </div>
  </div>
);

export default Rides;
