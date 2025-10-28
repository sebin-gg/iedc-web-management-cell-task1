import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export const Card = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-adapt', className)}
    {...props}
  >
    {children}
  </div>
));

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card-media', className)} {...props} />
));

export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-semibold text-lg', className)} {...props} />
));

export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
));

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card-body', className)} {...props} />
));

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card-footer text-sm', className)} {...props} />
));