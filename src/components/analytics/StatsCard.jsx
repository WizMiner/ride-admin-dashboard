// src/components/analytics/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../common/utils';

const StatsCard = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  palette,
  isLoading,
}) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        'rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg',
        palette.card,
        palette.border,
        isLoading && 'animate-pulse'
      )}
      role="region"
      aria-label={isLoading ? 'Loading stats card' : title}
    >
      <div className="flex items-center justify-between mb-2">
        {isLoading ? (
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        ) : (
          <p className={cn('text-sm font-medium', palette.mutedText)}>
            {title}
          </p>
        )}
        <div
          className={cn(
            'p-2 rounded-full bg-opacity-10',
            palette.primaryLightBg,
            palette.iconText
          )}
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          ) : (
            <Icon size={20} />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700 mt-2"></div>
      ) : (
        <p className={cn('text-2xl font-bold', palette.text)}>{value}</p>
      )}

      <div className="flex items-center mt-2">
        {isLoading ? (
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
        ) : (
          <>
            <TrendIcon
              size={16}
              className={cn(
                'mr-1',
                trend === 'up' ? 'text-green-500' : 'text-red-500'
              )}
            />
            <span
              className={cn(
                'text-sm font-medium',
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {change}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
