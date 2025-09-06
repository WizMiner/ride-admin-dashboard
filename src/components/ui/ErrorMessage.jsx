import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../common/utils';

const ErrorMessage = ({ message, onRetry, className }) => {
  return (
    <div
      className={cn(
        'p-4 bg-red-50 border border-red-200 rounded-md',
        className
      )}
    >
      <div className="flex items-center">
        <AlertCircle className="text-red-500 mr-2" size={20} />
        <span className="text-red-700">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
