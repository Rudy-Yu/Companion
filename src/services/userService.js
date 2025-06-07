import config from './config'
import { mockUsers } from '../data/mockData'

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

// Get user profile
export const getUserProfile = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockUsers.find(user => user.id === Number(userId))
  }

  return apiCall(`/users/${userId}`)
}

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      user: {
        ...mockUsers.find(user => user.id === Number(userId)),
        ...profileData
      }
    }
  }

  return apiCall(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
}

// Update user preferences
export const updateUserPreferences = async (userId, preferences) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      success: true,
      preferences
    }
  }

  return apiCall(`/users/${userId}/preferences`, {
    method: 'PUT',
    body: JSON.stringify(preferences)
  })
}

// Update user settings
export const updateUserSettings = async (userId, settings) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      success: true,
      settings
    }
  }

  return apiCall(`/users/${userId}/settings`, {
    method: 'PUT',
    body: JSON.stringify(settings)
  })
}

// Get user activity
export const getUserActivity = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = mockUsers.find(user => user.id === Number(userId))
    return user ? user.recentActivity : []
  }

  return apiCall(`/users/${userId}/activity`)
}

// Get user points
export const getUserPoints = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = mockUsers.find(user => user.id === Number(userId))
    return user ? user.points : 0
  }

  return apiCall(`/users/${userId}/points`)
}

// Get user membership level
export const getUserMembershipLevel = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = mockUsers.find(user => user.id === Number(userId))
    return user ? user.membershipLevel : 'basic'
  }

  return apiCall(`/users/${userId}/membership`)
}

// Update user photo
export const updateUserPhoto = async (userId, photoFile) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      photoUrl: URL.createObjectURL(photoFile)
    }
  }

  const formData = new FormData()
  formData.append('photo', photoFile)

  return apiCall(`/users/${userId}/photo`, {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let the browser set it with the boundary
    }
  })
}

// Delete user account
export const deleteUserAccount = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
  }

  return apiCall(`/users/${userId}`, {
    method: 'DELETE'
  })
}

// Get user notifications
export const getUserNotifications = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      {
        id: 1,
        type: 'booking_confirmed',
        message: 'Your booking with Sarah has been confirmed',
        date: '2024-03-20T10:00:00Z',
        read: false
      },
      {
        id: 2,
        type: 'new_message',
        message: 'You have a new message from Sarah',
        date: '2024-03-19T15:30:00Z',
        read: true
      }
    ]
  }

  return apiCall(`/users/${userId}/notifications`)
}

// Mark notification as read
export const markNotificationAsRead = async (userId, notificationId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/notifications/${notificationId}/read`, {
    method: 'PUT'
  })
}

// Get user favorites
export const getUserFavorites = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      {
        id: 1,
        companionId: 1,
        companionName: 'Sarah Johnson',
        companionPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        addedAt: '2024-03-15T08:00:00Z'
      }
    ]
  }

  return apiCall(`/users/${userId}/favorites`)
}

// Add companion to favorites
export const addToFavorites = async (userId, companionId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/favorites`, {
    method: 'POST',
    body: JSON.stringify({ companionId })
  })
}

// Remove companion from favorites
export const removeFromFavorites = async (userId, companionId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/favorites/${companionId}`, {
    method: 'DELETE'
  })
} 