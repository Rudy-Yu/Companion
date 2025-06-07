import React from 'react';
import { cn } from '@/lib/utils';

/**
 * PlayfulCard - Komponen card dengan styling playful
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.variant - Variant card: 'default', 'primary', 'secondary', 'accent'
 * @param {boolean} props.hoverable - Apakah card memiliki efek hover
 * @param {React.ReactNode} props.children - Konten card
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Props HTML div lainnya
 * @returns {React.ReactElement}
 */
const PlayfulCard = ({
  variant = 'default',
  hoverable = true,
  children,
  className,
  ...rest
}) => {
  // Mapping variant ke warna
  const variantClasses = {
    default: 'bg-card text-card-foreground',
    primary: 'bg-white border-[#6366f1]/20',
    secondary: 'bg-white border-[#8b5cf6]/20',
    accent: 'bg-white border-[#ec4899]/20',
    gradient: 'bg-gradient-to-br from-[#6366f1] to-[#ec4899] text-white',
  };

  // Efek hover
  const hoverClasses = hoverable
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    : '';

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-6 shadow-md',
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default PlayfulCard;

