import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * PlayfulButton - Komponen button dengan styling playful
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.variant - Variant button: 'default', 'primary', 'secondary', 'accent', 'outline', 'ghost'
 * @param {string} props.size - Ukuran button: 'sm', 'md', 'lg'
 * @param {boolean} props.isFullWidth - Apakah button full width
 * @param {React.ReactNode} props.children - Konten button
 * @param {React.HTMLAttributes<HTMLButtonElement>} props.rest - Props HTML button lainnya
 * @returns {React.ReactElement}
 */
const PlayfulButton = ({
  variant = 'default',
  size = 'md',
  isFullWidth = false,
  children,
  className,
  ...rest
}) => {
  // Mapping variant ke warna
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    primary: 'bg-[#6366f1] text-white hover:bg-[#4f46e5]',
    secondary: 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]',
    accent: 'bg-[#ec4899] text-white hover:bg-[#db2777]',
    outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary/10',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };

  // Mapping size ke padding dan font size
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  return (
    <Button
      className={cn(
        'rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        variantClasses[variant],
        sizeClasses[size],
        isFullWidth ? 'w-full' : '',
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PlayfulButton;

