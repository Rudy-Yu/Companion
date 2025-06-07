import config from './config'
import { mockBookings } from '../data/mockData'

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

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBookings.filter(booking => booking.userId === Number(userId))
  }

  return apiCall(`/users/${userId}/bookings`)
}

// Get booking by ID
export const getBookingById = async (bookingId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockBookings.find(booking => booking.id === Number(bookingId))
  }

  return apiCall(`/bookings/${bookingId}`)
}

// Create a new booking
export const createBooking = async (bookingData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    // In a real app, this would update the mock data
    return {
      success: true,
      booking: {
        id: Date.now(),
        ...bookingData,
        status: 'pending'
      }
    }
  }

  return apiCall('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  })
}

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    // In a real app, this would update the mock data
    return {
      success: true,
      booking: {
        ...mockBookings.find(b => b.id === Number(bookingId)),
        status
      }
    }
  }

  return apiCall(`/bookings/${bookingId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
}

// Cancel booking
export const cancelBooking = async (bookingId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    // In a real app, this would update the mock data
    return {
      success: true,
      booking: {
        ...mockBookings.find(b => b.id === Number(bookingId)),
        status: 'cancelled'
      }
    }
  }

  return apiCall(`/bookings/${bookingId}/cancel`, {
    method: 'POST'
  })
}

// Get booking history
export const getBookingHistory = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBookings.filter(
      booking => booking.userId === Number(userId) && 
      ['completed', 'cancelled'].includes(booking.status)
    )
  }

  return apiCall(`/users/${userId}/booking-history`)
}

// Get upcoming bookings
export const getUpcomingBookings = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBookings.filter(
      booking => booking.userId === Number(userId) && 
      ['pending', 'confirmed'].includes(booking.status)
    )
  }

  return apiCall(`/users/${userId}/upcoming-bookings`)
} 