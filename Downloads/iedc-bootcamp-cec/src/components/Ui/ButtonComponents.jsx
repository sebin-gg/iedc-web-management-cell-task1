import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  const variants = {
    default: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-600)]',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800',
    // make ghost readable: explicit text color in both themes
    ghost: 'bg-transparent text-[var(--text-color)] hover:bg-gray-100 dark:text-[var(--text-color)] dark:hover:bg-gray-800',
    // link should use accent color and be visible in dark mode
    link: 'text-[var(--accent)] dark:text-[var(--accent)] underline-offset-4 hover:underline',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});