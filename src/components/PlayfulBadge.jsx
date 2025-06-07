import { forwardRef } from 'react'

const PlayfulBadge = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className = '',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium'

  // Variants
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-50 text-blue-700',
    light: 'bg-gray-50 text-gray-600',
    dark: 'bg-gray-800 text-white',
  }

  // Sizes
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  }

  // Rounded variants
  const roundedVariants = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <span
      ref={ref}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${roundedVariants[rounded]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
})

PlayfulBadge.displayName = 'PlayfulBadge'

export default PlayfulBadge 