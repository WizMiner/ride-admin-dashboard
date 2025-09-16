// src/components/ui/SuccessMessage.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../common/utils';

const SuccessMessage = ({ message, className }) => {
  return (
    <div
      className={cn(
        'p-4 bg-green-50 border border-green-200 rounded-md',
        className
      )}
    >
      <div className="flex items-center">
        <CheckCircle className="text-green-500 mr-2" size={20} />
        <span className="text-green-700">{message}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
