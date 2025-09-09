//src/components/ui/Spinner.jsx
import React from 'react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme';
import { getPalette } from '../../common/themes';

const Spinner = ({ size = 'medium', className }) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300',
          `border-t-[${palette.chartColors.primary}]`,
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export default Spinner;
