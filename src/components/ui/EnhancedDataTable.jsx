// File: src/components/ui/EnhancedDataTable.jsx
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';

const EnhancedDataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) => {
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className={cn(
            'animate-spin rounded-full h-12 w-12 border-b-2',
            'border-primary-500'
          )}
        ></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg p-8 text-center',
          palette.card,
          palette.border
        )}
      >
        <p className={cn(palette.mutedText)}>No data available</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg shadow-sm overflow-x-auto',
        palette.card,
        palette.border
      )}
    >
      <table className="w-full">
        <thead>
          <tr className={cn('border-b', palette.border)}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'text-left p-4 font-medium text-sm uppercase tracking-wider',
                  palette.mutedText,
                  palette.primaryLightBg // Using existing primaryLightBg for header background
                )}
              >
                {column.title}
              </th>
            ))}
            <th
              className={cn(
                'text-left p-4 font-medium text-sm uppercase tracking-wider',
                palette.mutedText,
                palette.primaryLightBg // Using existing primaryLightBg for header background
              )}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={cn(
                'border-b',
                palette.border,
                palette.hover // Using theme's hover class
              )}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-4">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {onView && (
                    <button
                      className={cn(
                        'p-2 rounded transition-colors',
                        palette.mutedText,
                        'hover:text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                      )}
                      title="View Details"
                      onClick={() => onView(item)}
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className={cn(
                        'p-2 rounded transition-colors',
                        palette.mutedText,
                        'hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
                      )}
                      title="Edit"
                      onClick={() => onEdit(item)}
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className={cn(
                        'p-2 rounded transition-colors',
                        palette.mutedText,
                        'hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20'
                      )}
                      title="Delete"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedDataTable;
