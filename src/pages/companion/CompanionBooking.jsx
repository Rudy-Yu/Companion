import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function CompanionBooking() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 2,
    service: '',
    location: '',
    notes: ''
  })

  // Temporary data - in real app this would come from an API
  const [companion] = useState({
    id: 1,
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 150,
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
    ]
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call to create the booking
    navigate(`/booking/payment/${id}`)
  }

  const calculateTotal = () => {
    const service = companion.services.find(s => s.id === parseInt(bookingData.service))
    if (!service) return 0
    return service.price * bookingData.duration
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlayfulCard className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={companion.photo}
              alt={companion.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book {companion.name}</h1>
              <p className="text-gray-600">${companion.price}/hr</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Service</label>
              <select
                name="service"
                value={bookingData.service}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                {companion.services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price}/hr ({service.duration} hours)
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={bookingData.time}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
              <input
                type="number"
                name="duration"
                value={bookingData.duration}
                onChange={handleInputChange}
                required
                min="1"
                max="8"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Meeting Location</label>
              <input
                type="text"
                name="location"
                value={bookingData.location}
                onChange={handleInputChange}
                required
                placeholder="Enter meeting location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                name="notes"
                value={bookingData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any special requests or requirements?"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="text-gray-900">
                    {companion.services.find(s => s.id === parseInt(bookingData.service))?.name || '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="text-gray-900">
                    {bookingData.date && bookingData.time
                      ? `${bookingData.date} at ${bookingData.time}`
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">{bookingData.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="text-gray-900">{bookingData.location || '-'}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <PlayfulButton
                type="submit"
                variant="primary"
                disabled={!bookingData.service || !bookingData.date || !bookingData.time || !bookingData.location}
              >
                Proceed to Payment
              </PlayfulButton>
            </div>
          </form>
        </PlayfulCard>
      </div>
    </div>
  )
}

export default CompanionBooking 