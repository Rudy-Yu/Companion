// User related types
export interface User {
  id: number
  name: string
  email: string
  photo: string
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  points: number
  upcomingBookings: Booking[]
  recentActivity: Activity[]
}

export interface Activity {
  id: number
  type: 'booking' | 'review' | 'message'
  description: string
  date: string
}

// Companion related types
export interface Companion {
  id: number
  name: string
  photo: string
  location: string
  languages: string[]
  rating: number
  reviews: number
  price: number
  serviceTypes: string[]
  description: string
  about: string
  availability: Availability
  services: Service[]
  reviews: Review[]
}

export interface Availability {
  [key: string]: {
    start: string
    end: string
  }
}

export interface Service {
  id: number
  name: string
  description: string
  duration: number
  price: number
}

// Booking related types
export interface Booking {
  id: number
  userId: number
  companionId: number
  serviceId: number
  date: string
  time: string
  duration: number
  location: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: number
  notes?: string
}

// Message related types
export interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: string
}

// Review related types
export interface Review {
  id: number
  userId: number
  companionId: number
  rating: number
  comment: string
  date: string
}

// Filter and sort types
export interface CompanionFilters {
  location: string
  priceRange: string
  rating: string
  language: string
  serviceType: string
}

export type SortOption = 'rating' | 'price_low' | 'price_high' | 'reviews' 