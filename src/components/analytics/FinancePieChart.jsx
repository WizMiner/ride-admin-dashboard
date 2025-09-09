// src/components/analytics/FinancePieChart.jsx
import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '../../common/utils';

const FinancePieChart = ({ data, palette, currencySymbol = 'Birr' }) => {
  // Use chartColors from the palette
  const COLORS = [
    palette.chartColors.primary,
    palette.chartColors.accent,
    palette.chartColors.secondary || '#999999', // Fallback for a third color
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill={palette.text} // Changed default fill to palette.text, though individual cells will override
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [
            `${currencySymbol}${value.toFixed(2)}`,
            'Amount',
          ]}
          contentStyle={{
            backgroundColor: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: '8px',
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default FinancePieChart;
