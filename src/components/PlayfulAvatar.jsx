import { forwardRef } from 'react'

const PlayfulAvatar = forwardRef(({
  src,
  alt,
  size = 'md',
  status,
  statusPosition = 'bottom-right',
  className = '',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'relative inline-block'

  // Sizes
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
    '2xl': 'w-16 h-16',
  }

  // Status variants
  const statusVariants = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
    away: 'bg-yellow-400',
  }

  // Status position variants
  const statusPositionVariants = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }

  // Status size variants
  const statusSizeVariants = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  }

  // Get status size based on avatar size
  const getStatusSize = () => {
    switch (size) {
      case 'xs':
        return 'xs'
      case 'sm':
        return 'sm'
      case 'md':
        return 'md'
      case 'lg':
        return 'lg'
      case 'xl':
        return 'xl'
      case '2xl':
        return '2xl'
      default:
        return 'md'
    }
  }

  return (
    <div
      ref={ref}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {/* Avatar image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full object-cover"
      />

      {/* Status indicator */}
      {status && (
        <span
          className={`
            absolute
            ${statusPositionVariants[statusPosition]}
            ${statusSizeVariants[getStatusSize()]}
            ${statusVariants[status]}
            rounded-full
            ring-2
            ring-white
          `}
        />
      )}
    </div>
  )
})

PlayfulAvatar.displayName = 'PlayfulAvatar'

export default PlayfulAvatar 