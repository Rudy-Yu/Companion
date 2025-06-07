import { forwardRef, useState } from 'react'

const PlayfulInput = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  required = false,
  className = '',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  // Base styles
  const baseStyles = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200'

  // States
  const stateStyles = {
    default: 'border-gray-300',
    error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-50 text-gray-500 cursor-not-allowed',
    focused: 'border-blue-500 ring-1 ring-blue-500',
  }

  // Width
  const width = fullWidth ? 'w-full' : ''

  // Get current state
  const getStateStyle = () => {
    if (disabled) return stateStyles.disabled
    if (error) return stateStyles.error
    if (isFocused) return stateStyles.focused
    return stateStyles.default
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className={`${width} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          className={`
            ${baseStyles}
            ${getStateStyle()}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
          `}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Right icon */}
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>

      {/* Helper text */}
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

PlayfulInput.displayName = 'PlayfulInput'

export default PlayfulInput 