import { useState } from 'react'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function ProfileHistory() {
  const [history] = useState([
    {
      id: 1,
      companion: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-02-15',
      time: '14:00',
      location: 'Tokyo, Japan',
      duration: 4,
      price: 150,
      rating: 5,
      review: 'Sarah was an amazing companion! She showed me around Tokyo and helped me practice my Japanese.'
    },
    {
      id: 2,
      companion: 'Mike Chen',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-01-20',
      time: '10:00',
      location: 'Seoul, South Korea',
      duration: 6,
      price: 120,
      rating: 4,
      review: 'Great experience with Mike. He knows all the best local spots!'
    }
  ])

  const renderHistoryCard = (booking) => (
    <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-4">
        <img
          src={booking.photo}
          alt={booking.companion}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{booking.companion}</h3>
              <p className="text-sm text-gray-600">
                {booking.date} at {booking.time}
              </p>
              <p className="text-sm text-gray-600">{booking.location}</p>
              <p className="text-sm text-gray-600">Duration: {booking.duration} hours</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">${booking.price}/hr</p>
              <div className="flex items-center justify-end text-yellow-400 mt-1">
                {[...Array(booking.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          {booking.review && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
            </div>
          )}
          <div className="mt-4 flex justify-end space-x-2">
            <PlayfulButton variant="secondary" size="small">
              Book Again
            </PlayfulButton>
            <PlayfulButton variant="primary" size="small">
              View Details
            </PlayfulButton>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <PlayfulCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
          <div className="flex space-x-2">
            <PlayfulButton variant="secondary" size="small">
              Export
            </PlayfulButton>
            <PlayfulButton variant="primary" size="small">
              Filter
            </PlayfulButton>
          </div>
        </div>

        <div className="space-y-4">
          {history.map(renderHistoryCard)}
        </div>
      </PlayfulCard>
    </div>
  )
}

export default ProfileHistory 