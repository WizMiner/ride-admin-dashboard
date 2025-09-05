import { cn } from "../common/utils";

const Insights = () => (
  <div className={cn("space-y-6", "text-theme")}>
    <h1 className="text-3xl font-bold text-foreground">Insights</h1>
    <p className="text-muted-foreground">
      Business insights and recommendations.
    </p>
    <div className={cn("card p-6", "bg-card")}>
      <p className="text-center text-muted-foreground">
        Insights page coming soon...
      </p>
    </div>
  </div>
);

export default Insights;
