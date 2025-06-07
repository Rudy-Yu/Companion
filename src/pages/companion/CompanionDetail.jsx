import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function CompanionDetail() {
  const { id } = useParams()

  // Temporary data - in real app this would come from an API
  const [companion] = useState({
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
    about: 'I am a certified tour guide with over 5 years of experience in Tokyo. I specialize in cultural tours, language practice sessions, and helping visitors experience authentic Japanese culture. I am fluent in both English and Japanese, and I love sharing my knowledge about Japanese history, art, and traditions.',
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
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <PlayfulCard className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={companion.photo}
                    alt={companion.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{companion.name}</h1>
                      <p className="text-gray-600">{companion.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">${companion.price}/hr</p>
                      <div className="flex items-center justify-end mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">{companion.rating}</span>
                        <span className="ml-1 text-gray-500">({companion.reviews.length} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {companion.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {companion.serviceTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600">{companion.description}</p>

                  <div className="mt-6">
                    <Link to={`/companion/${companion.id}/booking`}>
                      <PlayfulButton variant="primary" className="w-full">
                        Book Now
                      </PlayfulButton>
                    </Link>
                  </div>
                </div>
              </div>
            </PlayfulCard>

            {/* About */}
            <PlayfulCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600">{companion.about}</p>
            </PlayfulCard>

            {/* Services */}
            <PlayfulCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Services</h2>
              <div className="space-y-4">
                {companion.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Duration: {service.duration} hours</p>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">${service.price}</p>
                  </div>
                ))}
              </div>
            </PlayfulCard>

            {/* Reviews */}
            <PlayfulCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-4">
                {companion.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.user}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </PlayfulCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <PlayfulCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Availability</h2>
              <div className="space-y-2">
                {Object.entries(companion.availability).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize text-gray-600">{day}</span>
                    <span className="text-gray-900">
                      {hours.start} - {hours.end}
                    </span>
                  </div>
                ))}
              </div>
            </PlayfulCard>

            {/* Contact */}
            <PlayfulCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-4">
                <PlayfulButton variant="outline" className="w-full">
                  Send Message
                </PlayfulButton>
                <PlayfulButton variant="primary" className="w-full">
                  Book Now
                </PlayfulButton>
              </div>
            </PlayfulCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanionDetail 