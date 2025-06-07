import { useState } from 'react'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function ProfileBooking() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [bookings] = useState({
    upcoming: [
      {
        id: 1,
        companion: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2024-03-15',
        time: '14:00',
        location: 'Tokyo, Japan',
        status: 'confirmed',
        price: 150
      },
      {
        id: 2,
        companion: 'Mike Chen',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2024-03-20',
        time: '10:00',
        location: 'Seoul, South Korea',
        status: 'pending',
        price: 120
      }
    ],
    past: [
      {
        id: 3,
        companion: 'Emily Wong',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2024-02-15',
        time: '15:00',
        location: 'Bangkok, Thailand',
        status: 'completed',
        price: 100,
        rating: 5
      }
    ]
  })

  const renderBookingCard = (booking) => (
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
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">${booking.price}/hr</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            {booking.status === 'pending' && (
              <>
                <PlayfulButton variant="secondary" size="small">
                  Cancel
                </PlayfulButton>
                <PlayfulButton variant="primary" size="small">
                  Confirm
                </PlayfulButton>
              </>
            )}
            {booking.status === 'completed' && !booking.rating && (
              <PlayfulButton variant="primary" size="small">
                Leave Review
              </PlayfulButton>
            )}
            {booking.status === 'completed' && booking.rating && (
              <div className="flex items-center text-yellow-400">
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
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <PlayfulCard className="p-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Bookings
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past Bookings
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {bookings[activeTab].map(renderBookingCard)}
        </div>
      </PlayfulCard>
    </div>
  )
}

export default ProfileBooking 