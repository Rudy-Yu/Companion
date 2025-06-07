// Environment configuration
const config = {
  // Set to false to use real API instead of mock data
  useMockData: true,
  
  // API endpoints
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  
  // Feature flags
  features: {
    enableChat: true,
    enableReviews: true,
    enablePayments: true
  }
}

export default config 