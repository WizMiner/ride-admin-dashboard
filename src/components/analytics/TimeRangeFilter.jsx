// src/components/analytics/TimeRangeFilter.jsx
import React from 'react';
import { Filter, Download } from 'lucide-react';
import { cn } from '../../common/utils';

const TimeRangeFilter = ({
  timeRange,
  setTimeRange,
  onExport,
  palette,
  options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ],
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex items-center gap-2 p-2 rounded-lg',
          palette.card,
          palette.border
        )}
      >
        <Filter size={16} className={cn(palette.mutedText)} />
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={cn(
            'bg-transparent border-none outline-none',
            palette.text
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onExport}
        className={cn(
          'flex items-center gap-2 p-2 rounded-lg',
          palette.btnPrimary
        )}
      >
        <Download size={16} />
        <span>Export</span>
      </button>
    </div>
  );
};

export default TimeRangeFilter;
