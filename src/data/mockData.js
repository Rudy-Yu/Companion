// Mock data for testing and development
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    membershipLevel: 'Gold',
    points: 750,
    upcomingBookings: [
      {
        id: 1,
        companionName: 'Sarah Johnson',
        companionPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2024-03-20',
        time: '14:00',
        location: 'Tokyo Tower',
        status: 'confirmed',
        price: 150
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'booking',
        description: 'Booked a tour with Sarah Johnson',
        date: '2024-03-15'
      },
      {
        id: 2,
        type: 'review',
        description: 'Left a review for Mike Chen',
        date: '2024-03-10'
      }
    ]
  }
]

export const mockCompanions = [
  {
    id: 1,
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Tokyo, Japan',
    languages: ['English', 'Japanese'],
    rating: 4.9,
    reviews: 128,
    price: 150,
    serviceTypes: ['Tour Guide', 'Language Practice', 'Cultural Experience'],
    description: 'Experienced tour guide with deep knowledge of Japanese culture and history.',
    about: 'I am a certified tour guide with over 5 years of experience in Tokyo. I specialize in cultural tours, language practice sessions, and helping visitors experience authentic Japanese culture.',
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { start: '10:00', end: '16:00' }
    },
    services: [
      {
        id: 1,
        name: 'City Tour',
        description: 'Explore Tokyo\'s most famous landmarks and hidden gems',
        duration: 4,
        price: 150
      },
      {
        id: 2,
        name: 'Language Practice',
        description: 'Improve your Japanese through conversation and cultural activities',
        duration: 2,
        price: 100
      },
      {
        id: 3,
        name: 'Cultural Experience',
        description: 'Learn traditional Japanese arts and customs',
        duration: 3,
        price: 120
      }
    ],
    reviews: [
      {
        id: 1,
        user: 'John Smith',
        rating: 5,
        comment: 'Sarah was an amazing guide! She showed us places we would never have found on our own.',
        date: '2024-02-15'
      },
      {
        id: 2,
        user: 'Emily Brown',
        rating: 5,
        comment: 'Great language practice session. Sarah is very patient and helpful.',
        date: '2024-02-10'
      }
    ]
  },
  {
    id: 2,
    name: 'Mike Chen',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Seoul, South Korea',
    languages: ['English', 'Korean'],
    rating: 4.8,
    reviews: 95,
    price: 120,
    serviceTypes: ['Food Tour', 'Shopping Guide', 'Nightlife'],
    description: 'Food enthusiast and shopping expert who knows all the best local spots.',
    about: 'I am a local food and shopping expert with extensive knowledge of Seoul\'s best spots. I love sharing my passion for Korean cuisine and helping visitors discover hidden gems.',
    availability: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '11:00', end: '20:00' },
      sunday: { start: '11:00', end: '20:00' }
    },
    services: [
      {
        id: 1,
        name: 'Food Tour',
        description: 'Explore Seoul\'s best local restaurants and street food',
        duration: 3,
        price: 120
      },
      {
        id: 2,
        name: 'Shopping Guide',
        description: 'Visit the best shopping districts and markets',
        duration: 4,
        price: 150
      },
      {
        id: 3,
        name: 'Nightlife Tour',
        description: 'Experience Seoul\'s vibrant nightlife scene',
        duration: 3,
        price: 130
      }
    ],
    reviews: [
      {
        id: 1,
        user: 'Lisa Wang',
        rating: 5,
        comment: 'Mike took us to amazing restaurants we would never have found on our own!',
        date: '2024-02-18'
      },
      {
        id: 2,
        user: 'David Kim',
        rating: 4,
        comment: 'Great shopping tour, Mike knows all the best places.',
        date: '2024-02-12'
      }
    ]
  }
]

export const mockBookings = [
  {
    id: 1,
    userId: 1,
    companionId: 1,
    serviceId: 1,
    date: '2024-03-20',
    time: '14:00',
    duration: 4,
    location: 'Tokyo Tower',
    status: 'confirmed',
    price: 600,
    notes: 'First time in Tokyo, would like to see the main attractions'
  },
  {
    id: 2,
    userId: 1,
    companionId: 2,
    serviceId: 1,
    date: '2024-03-25',
    time: '11:00',
    duration: 3,
    location: 'Myeongdong',
    status: 'pending',
    price: 360,
    notes: 'Interested in trying local street food'
  }
]

export const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 1,
    content: 'Hi Sarah, I\'m interested in booking a city tour for next week.',
    timestamp: '2024-03-15T10:00:00Z'
  },
  {
    id: 2,
    senderId: 1,
    receiverId: 1,
    content: 'Yes, I\'m looking forward to exploring Tokyo!',
    timestamp: '2024-03-15T10:05:00Z'
  }
]

export const mockReviews = [
  {
    id: 1,
    userId: 1,
    companionId: 1,
    rating: 5,
    comment: 'Sarah was an amazing guide! She showed us places we would never have found on our own.',
    date: '2024-02-15'
  },
  {
    id: 2,
    userId: 2,
    companionId: 1,
    rating: 5,
    comment: 'Great language practice session. Sarah is very patient and helpful.',
    date: '2024-02-10'
  }
] 