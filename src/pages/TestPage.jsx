import { useState, useEffect } from 'react'
import PlayfulCard from '../components/PlayfulCard'
import PlayfulButton from '../components/PlayfulButton'
import { getCompanions, getCompanionById } from '../services/companionService'
import { getUserBookings, createBooking } from '../services/bookingService'
import config from '../services/config'

function TestPage() {
  const [companions, setCompanions] = useState([])
  const [selectedCompanion, setSelectedCompanion] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Test companion filters
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    rating: '',
    language: '',
    serviceType: ''
  })

  // Load companions with filters
  const loadCompanions = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCompanions(filters)
      setCompanions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Load companion details
  const loadCompanionDetails = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCompanionById(id)
      setSelectedCompanion(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Load user bookings
  const loadBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserBookings(1) // Using mock user ID 1
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Test creating a booking
  const testCreateBooking = async () => {
    setLoading(true)
    setError(null)
    try {
      const bookingData = {
        userId: 1,
        companionId: 1,
        serviceId: 1,
        date: '2024-03-25',
        time: '14:00',
        duration: 2,
        location: 'Test Location',
        notes: 'Test booking'
      }
      const result = await createBooking(bookingData)
      console.log('Booking created:', result)
      // Reload bookings to see the new one
      await loadBookings()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Toggle mock data
  const toggleMockData = () => {
    config.useMockData = !config.useMockData
    // Reload data to see the effect
    loadCompanions()
    loadBookings()
  }

  useEffect(() => {
    loadCompanions()
    loadBookings()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <PlayfulCard className="p-6">
            <h1 className="text-2xl font-bold mb-4">Service Layer Test Page</h1>
            <div className="flex items-center space-x-4 mb-4">
              <PlayfulButton onClick={toggleMockData}>
                Toggle Mock Data (Currently: {config.useMockData ? 'ON' : 'OFF'})
              </PlayfulButton>
              <PlayfulButton onClick={loadCompanions}>Refresh Companions</PlayfulButton>
              <PlayfulButton onClick={loadBookings}>Refresh Bookings</PlayfulButton>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
          </PlayfulCard>
        </div>

        {/* Filters */}
        <PlayfulCard className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Test Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
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
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
                <option value="2">2+ stars</option>
              </select>
            </div>
          </div>
        </PlayfulCard>

        {/* Companions List */}
        <PlayfulCard className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Companions</h2>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="space-y-4">
              {companions.map(companion => (
                <div
                  key={companion.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={companion.photo}
                      alt={companion.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{companion.name}</h3>
                      <p className="text-sm text-gray-600">{companion.location}</p>
                    </div>
                  </div>
                  <PlayfulButton
                    onClick={() => loadCompanionDetails(companion.id)}
                    variant="outline"
                  >
                    View Details
                  </PlayfulButton>
                </div>
              ))}
            </div>
          )}
        </PlayfulCard>

        {/* Selected Companion Details */}
        {selectedCompanion && (
          <PlayfulCard className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Companion Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCompanion.photo}
                  alt={selectedCompanion.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium">{selectedCompanion.name}</h3>
                  <p className="text-gray-600">{selectedCompanion.location}</p>
                  <p className="text-sm text-gray-500">Rating: {selectedCompanion.rating} ({selectedCompanion.reviews} reviews)</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Services</h4>
                <div className="space-y-2">
                  {selectedCompanion.services.map(service => (
                    <div key={service.id} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-sm text-gray-500">${service.price}/hr - {service.duration} hours</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PlayfulCard>
        )}

        {/* Bookings List */}
        <PlayfulCard className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Bookings</h2>
            <PlayfulButton onClick={testCreateBooking}>Test Create Booking</PlayfulButton>
          </div>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Booking #{booking.id}</p>
                    <p className="text-sm text-gray-600">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {booking.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.price}</p>
                    <p className="text-sm text-gray-600">{booking.duration} hours</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PlayfulCard>
      </div>
    </div>
  )
}

export default TestPage 