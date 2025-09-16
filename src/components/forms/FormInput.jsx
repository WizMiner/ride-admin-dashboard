// src/components/forms/FormInput.jsx
import React from 'react';
import { cn } from '../../common/utils';

const FormInput = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  palette,
  required = false,
  placeholder = '',
  description = null,
}) => {
  const inputClasses = cn(
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
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={inputClasses}
        required={required}
        placeholder={placeholder}
      />
      {description && (
        <p className={cn('text-xs mt-1', palette.mutedText)}>{description}</p>
      )}
    </div>
  );
};

export default FormInput;
