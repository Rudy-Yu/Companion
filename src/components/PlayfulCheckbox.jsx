import { forwardRef } from 'react'

const PlayfulCheckbox = forwardRef(({
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200'

  // States
  const stateStyles = {
    default: 'border-gray-300',
    error: 'border-red-300 text-red-600 focus:ring-red-500',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  }

  // Get current state
  const getStateStyle = () => {
    if (disabled) return stateStyles.disabled
    if (error) return stateStyles.error
    return stateStyles.default
  }

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="checkbox"
          className={`
            ${baseStyles}
            ${getStateStyle()}
          `}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>

      {/* Label and helper text */}
      <div className="ml-3">
        {label && (
          <label
            className={`
              text-sm font-medium
              ${disabled ? 'text-gray-400' : 'text-gray-700'}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Helper text */}
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    </div>
  )
})

PlayfulCheckbox.displayName = 'PlayfulCheckbox'

export default PlayfulCheckbox 