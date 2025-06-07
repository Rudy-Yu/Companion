import config from './config'

// Helper function to handle API calls
const apiCall = async (endpoint, options = {}) => {
  if (config.useMockData) {
    return null // Will be handled by mock data
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Register new user
export const register = async (userData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      user: {
        id: 1,
        ...userData,
        token: 'mock-jwt-token'
      }
    }
  }

  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// Login user
export const login = async (credentials) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      user: {
        id: 1,
        email: credentials.email,
        name: 'John Doe',
        token: 'mock-jwt-token'
      }
    }
  }

  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
}

// Logout user
export const logout = async () => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall('/auth/logout', {
    method: 'POST'
  })
}

// Forgot password
export const forgotPassword = async (email) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'Password reset link sent to your email'
    }
  }

  return apiCall('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

// Reset password
export const resetPassword = async (token, newPassword) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'Password has been reset successfully'
    }
  }

  return apiCall('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword })
  })
}

// Verify email
export const verifyEmail = async (token) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'Email verified successfully'
    }
  }

  return apiCall('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token })
  })
}

// Resend verification email
export const resendVerificationEmail = async (email) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'Verification email sent'
    }
  }

  return apiCall('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'Password changed successfully'
    }
  }

  return apiCall(`/auth/change-password`, {
    method: 'POST',
    body: JSON.stringify({ userId, oldPassword, newPassword })
  })
}

// Get current user
export const getCurrentUser = async () => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      membershipLevel: 'premium',
      points: 150
    }
  }

  return apiCall('/auth/me')
}

// Update auth token
export const updateAuthToken = async (refreshToken) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      success: true,
      token: 'new-mock-jwt-token'
    }
  }

  return apiCall('/auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  })
}

// Social login (Google, Facebook, etc.)
export const socialLogin = async (provider, token) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        token: 'mock-jwt-token'
      }
    }
  }

  return apiCall(`/auth/${provider}`, {
    method: 'POST',
    body: JSON.stringify({ token })
  })
}

// Check if email exists
export const checkEmailExists = async (email) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      exists: email === 'john@example.com'
    }
  }

  return apiCall(`/auth/check-email`, {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

// Get auth status
export const getAuthStatus = async () => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  }

  return apiCall('/auth/status')
} 