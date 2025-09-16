// src/components/ui/Toast.jsx
import React from 'react';
import { cn } from '../../common/utils';
import { XCircle, CheckCircle, Info } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  const baseClasses =
    'p-4 rounded-lg shadow-md flex items-center gap-2 text-white transition-transform transform translate-x-0';
  const typeClasses = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  const Icon = {
    info: Info,
    success: CheckCircle,
    error: XCircle,
  };

  const SelectedIcon = Icon[type] || Info;

  return (
    <div className={cn(baseClasses, typeClasses[type])}>
      <SelectedIcon size={20} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
        <XCircle size={16} />
      </button>
    </div>
  );
};
