// File: src/components/ui/EnhancedDataTable.jsx
import React, { useState, useMemo } from 'react';
import { Eye, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { cn, getValue } from '../../common/utils';
import { useTheme } from '../../hooks/useTheme.jsx';
import { getPalette } from '../../common/themes';

const EnhancedDataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
}) => {
  // console.log('EnhancedDataTable received data:', data);
  const { currentTheme } = useTheme();
  const palette = getPalette(currentTheme);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const hasActions = onView || onEdit || onDelete;

  // 🔹 Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const valA = getValue(a, sortConfig.key);
      const valB = getValue(b, sortConfig.key);

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }

      return sortConfig.direction === 'asc'
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }, [data, sortConfig]);

  // 🔹 Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key && prev.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
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
    <div className="space-y-4">
      {/* Table */}
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
                  onClick={() => handleSort(column.key)}
                  className={cn(
                    'text-left p-4 font-medium text-sm uppercase tracking-wider cursor-pointer select-none',
                    palette.mutedText,
                    palette.primaryLightBg
                  )}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {sortConfig.key === column.key &&
                      (sortConfig.direction === 'asc' ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </div>
                </th>
              ))}

              {/* ✅ Only render the Actions column if any action is provided */}
              {hasActions && (
                <th
                  className={cn(
                    'text-left p-4 font-medium text-sm uppercase tracking-wider',
                    palette.mutedText,
                    palette.primaryLightBg
                  )}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id || index}
                className={cn('border-b', palette.border, palette.hover)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-4">
                    {/* ⬇️ fallback: use getValue so nested keys also display */}
                    {column.render
                      ? column.render(item)
                      : getValue(item, column.key)}
                  </td>
                ))}

                {/* ✅ Only render actions cell if at least one action exists */}
                {hasActions && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className={cn('text-sm', palette.mutedText)}>
            Rows per page:
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={cn(
              'px-2 py-1 border rounded',
              palette.border,
              palette.card,
              palette.text
            )}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page{' '}
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                let page = Number(e.target.value);
                if (page < 1) page = 1;
                if (page > totalPages) page = totalPages;
                setCurrentPage(page);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  let page = Number(e.target.value);
                  if (page < 1) page = 1;
                  if (page > totalPages) page = totalPages;
                  setCurrentPage(page);
                }
              }}
              className={cn(
                'w-16 px-2 py-1 border rounded text-sm text-center',
                palette.border,
                palette.card,
                palette.text
              )}
            />{' '}
            of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDataTable;
