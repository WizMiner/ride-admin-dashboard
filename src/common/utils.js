import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
