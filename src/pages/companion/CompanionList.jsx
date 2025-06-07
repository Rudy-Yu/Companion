import { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function CompanionList() {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    rating: '',
    language: '',
    serviceType: ''
  })

  const [sortBy, setSortBy] = useState('rating')

  // Temporary data - in real app this would come from an API
  const [companions] = useState([
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
      description: 'Experienced tour guide with deep knowledge of Japanese culture and history.'
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
      description: 'Food enthusiast and shopping expert who knows all the best local spots.'
    }
  ])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const renderCompanionCard = (companion) => (
    <PlayfulCard key={companion.id} className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <img
            src={companion.photo}
            alt={companion.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{companion.name}</h3>
              <p className="text-gray-600">{companion.location}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">${companion.price}/hr</p>
              <div className="flex items-center justify-end mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">{companion.rating}</span>
                <span className="ml-1 text-gray-500">({companion.reviews} reviews)</span>
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

          <div className="mt-6 flex justify-end space-x-4">
            <Link to={`/companion/${companion.id}`}>
              <PlayfulButton variant="outline">View Profile</PlayfulButton>
            </Link>
            <Link to={`/companion/${companion.id}/booking`}>
              <PlayfulButton variant="primary">Book Now</PlayfulButton>
            </Link>
          </div>
        </div>
      </div>
    </PlayfulCard>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Sort */}
        <div className="mb-8">
          <PlayfulCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Enter location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="51-100">$51 - $100</option>
                  <option value="101-150">$101 - $150</option>
                  <option value="151+">$151+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="4">4+ stars</option>
                  <option value="3">3+ stars</option>
                  <option value="2">2+ stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="english">English</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="rating">Rating</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </PlayfulCard>
        </div>

        {/* Companion List */}
        <div className="space-y-6">
          {companions.map(renderCompanionCard)}
        </div>
      </div>
    </div>
  )
}

export default CompanionList 