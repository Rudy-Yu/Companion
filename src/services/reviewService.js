import config from './config'
import { mockReviews } from '../data/mockData'

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

// Get companion reviews
export const getCompanionReviews = async (companionId, options = {}) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    let reviews = mockReviews.filter(review => review.companionId === Number(companionId))
    
    // Apply filters
    if (options.rating) {
      reviews = reviews.filter(review => review.rating >= Number(options.rating))
    }
    
    if (options.sort === 'newest') {
      reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (options.sort === 'oldest') {
      reviews.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (options.sort === 'highest') {
      reviews.sort((a, b) => b.rating - a.rating)
    } else if (options.sort === 'lowest') {
      reviews.sort((a, b) => a.rating - b.rating)
    }
    
    return reviews
  }

  const queryParams = new URLSearchParams(options).toString()
  return apiCall(`/companions/${companionId}/reviews?${queryParams}`)
}

// Get user reviews
export const getUserReviews = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReviews.filter(review => review.userId === Number(userId))
  }

  return apiCall(`/users/${userId}/reviews`)
}

// Create review
export const createReview = async (reviewData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      review: {
        id: Date.now(),
        ...reviewData,
        date: new Date().toISOString()
      }
    }
  }

  return apiCall('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
  })
}

// Update review
export const updateReview = async (reviewId, reviewData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      review: {
        id: reviewId,
        ...reviewData,
        date: new Date().toISOString()
      }
    }
  }

  return apiCall(`/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData)
  })
}

// Delete review
export const deleteReview = async (reviewId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/reviews/${reviewId}`, {
    method: 'DELETE'
  })
}

// Get review details
export const getReviewDetails = async (reviewId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReviews.find(review => review.id === Number(reviewId))
  }

  return apiCall(`/reviews/${reviewId}`)
}

// Like review
export const likeReview = async (reviewId, userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/reviews/${reviewId}/like`, {
    method: 'POST',
    body: JSON.stringify({ userId })
  })
}

// Unlike review
export const unlikeReview = async (reviewId, userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/reviews/${reviewId}/unlike`, {
    method: 'POST',
    body: JSON.stringify({ userId })
  })
}

// Report review
export const reportReview = async (reviewId, reportData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      success: true,
      reportId: 'mock_report_id'
    }
  }

  return apiCall(`/reviews/${reviewId}/report`, {
    method: 'POST',
    body: JSON.stringify(reportData)
  })
}

// Get review statistics
export const getReviewStatistics = async (companionId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const reviews = mockReviews.filter(review => review.companionId === Number(companionId))
    const totalReviews = reviews.length
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
    const ratingDistribution = {
      5: reviews.filter(review => review.rating === 5).length,
      4: reviews.filter(review => review.rating === 4).length,
      3: reviews.filter(review => review.rating === 3).length,
      2: reviews.filter(review => review.rating === 2).length,
      1: reviews.filter(review => review.rating === 1).length
    }

    return {
      totalReviews,
      averageRating,
      ratingDistribution
    }
  }

  return apiCall(`/companions/${companionId}/review-statistics`)
}

// Get recent reviews
export const getRecentReviews = async (limit = 5) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  return apiCall(`/reviews/recent?limit=${limit}`)
}

// Get top rated companions
export const getTopRatedCompanions = async (limit = 5) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    // This would require companion data to be available
    return []
  }

  return apiCall(`/companions/top-rated?limit=${limit}`)
} 