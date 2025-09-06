import { cn } from '../common/utils';

const Payments = () => (
  <div className={cn('space-y-6', 'text-theme')}>
    <h1 className="text-3xl font-bold text-foreground">Payments</h1>
    <p className="text-muted-foreground">
      Track and manage payment transactions.
    </p>
    <div className={cn('card p-6', 'bg-card')}>
      <p className="text-center text-muted-foreground">
        Payments management page coming soon...
      </p>
    </div>
  </div>
);

export default Payments;
