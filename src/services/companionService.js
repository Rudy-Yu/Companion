import config from './config'
import { mockCompanions } from '../data/mockData'

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

// Get all companions with optional filters
export const getCompanions = async (filters = {}) => {
  if (config.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Apply filters to mock data
    let filteredCompanions = [...mockCompanions]
    
    if (filters.location) {
      filteredCompanions = filteredCompanions.filter(
        c => c.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filteredCompanions = filteredCompanions.filter(
        c => c.price >= min && (!max || c.price <= max)
      )
    }
    
    if (filters.rating) {
      filteredCompanions = filteredCompanions.filter(
        c => c.rating >= Number(filters.rating)
      )
    }
    
    if (filters.language) {
      filteredCompanions = filteredCompanions.filter(
        c => c.languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      )
    }
    
    if (filters.serviceType) {
      filteredCompanions = filteredCompanions.filter(
        c => c.serviceTypes.some(type => 
          type.toLowerCase().includes(filters.serviceType.toLowerCase())
        )
      )
    }
    
    return filteredCompanions
  }

  // Real API call
  const queryParams = new URLSearchParams(filters).toString()
  return apiCall(`/companions?${queryParams}`)
}

// Get companion by ID
export const getCompanionById = async (id) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockCompanions.find(c => c.id === Number(id))
  }

  return apiCall(`/companions/${id}`)
}

// Get companion availability
export const getCompanionAvailability = async (id, date) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const companion = mockCompanions.find(c => c.id === Number(id))
    return companion ? companion.availability : null
  }

  return apiCall(`/companions/${id}/availability?date=${date}`)
}

// Get companion services
export const getCompanionServices = async (id) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const companion = mockCompanions.find(c => c.id === Number(id))
    return companion ? companion.services : []
  }

  return apiCall(`/companions/${id}/services`)
}

// Get companion reviews
export const getCompanionReviews = async (id) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const companion = mockCompanions.find(c => c.id === Number(id))
    return companion ? companion.reviews : []
  }

  return apiCall(`/companions/${id}/reviews`)
}

// Add a new review for a companion
export const addCompanionReview = async (companionId, reviewData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    // In a real app, this would update the mock data
    return { success: true, review: { id: Date.now(), ...reviewData } }
  }

  return apiCall(`/companions/${companionId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  })
} 