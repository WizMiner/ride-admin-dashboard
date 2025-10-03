import React from 'react';
import { cn } from '../../common/utils.js';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes.js';

const Tooltip = ({ content, children }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  return (
    <div className="group relative inline-flex">
      {children}
      <span
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
          'hidden group-hover:block',
          'whitespace-nowrap rounded px-2 py-1',
          'text-xs shadow-lg z-50',
          palette.tooltipBg,
          palette.tooltipText
        )}
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
