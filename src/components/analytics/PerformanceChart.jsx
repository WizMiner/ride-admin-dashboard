// src/components/analytics/PerformanceChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '../../common/utils';

const CustomTooltip = ({ active, payload, label, palette, currencySymbol }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cn('p-3 rounded-lg shadow-md', palette.card, palette.border)}
      >
        <p className={cn('font-medium', palette.text)}>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className={cn('text-sm', palette.text)}
            style={{ color: entry.color }} // Ensure color is correctly passed from Recharts' internal data
          >
            {entry.name}:{' '}
            {entry.name.includes('Earnings')
              ? `${currencySymbol}${entry.value.toFixed(2)}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({ data, palette, currencySymbol = 'Birr' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={palette.mutedText} />
        <XAxis
          dataKey="name"
          stroke={palette.text}
          tick={{ fill: palette.text }}
        />
        <YAxis stroke={palette.text} tick={{ fill: palette.text }} />
        <Tooltip
          content={
            <CustomTooltip palette={palette} currencySymbol={currencySymbol} />
          }
        />
        <Legend />
        <Bar
          dataKey="rides"
          name="Number of Rides"
          fill={palette.chartColors.primary} // Use chartColors for Recharts
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="earnings"
          name={`Earnings (${currencySymbol})`}
          fill={palette.chartColors.accent} // Use chartColors for Recharts
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
