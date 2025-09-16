// src/components/forms/FormTextarea.jsx
import React from 'react';
import { cn } from '../../common/utils';

const FormTextarea = ({
  name,
  label,
  value,
  onChange,
  palette,
  required = false,
}) => {
  const textareaClasses = cn(
    'w-full p-2 border rounded',
    palette.border,
    palette.card,
    palette.text
  );

  return (
    <div>
      <label className={cn('block text-sm font-medium mb-1', palette.text)}>
        {label}
      </label>
      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        className={textareaClasses}
        required={required}
        rows="3"
      />
    </div>
  );
};
