// src/components/forms/FormSelect.jsx
import React from 'react';
import { cn } from '../../common/utils';

const FormSelect = ({
  name,
  label,
  value,
  onChange,
  options,
  palette,
  required = false,
}) => {
  const selectClasses = cn(
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
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className={selectClasses}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
