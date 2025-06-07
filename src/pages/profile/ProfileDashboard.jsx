import { useState } from 'react'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function ProfileDashboard() {
  // Temporary user data - in real app this would come from an API/context
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    level: 'Gold',
    points: 750,
    pointsToNextLevel: 1000,
    upcomingBookings: [
      {
        id: 1,
        companion: 'Sarah Johnson',
        date: '2024-03-15',
        time: '14:00',
        location: 'Tokyo, Japan',
        status: 'confirmed'
      },
      {
        id: 2,
        companion: 'Mike Chen',
        date: '2024-03-20',
        time: '10:00',
        location: 'Seoul, South Korea',
        status: 'pending'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'booking',
        description: 'Booked a companion for Tokyo trip',
        date: '2024-03-01'
      },
      {
        id: 2,
        type: 'review',
        description: 'Left a review for Emily Wong',
        date: '2024-02-28'
      }
    ]
  })

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <PlayfulCard className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.photo}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {user.level} Member
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Level Progress</span>
            <span>{user.points}/{user.pointsToNextLevel} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(user.points / user.pointsToNextLevel) * 100}%` }}
            ></div>
          </div>
        </div>
      </PlayfulCard>

      {/* Upcoming Bookings */}
      <PlayfulCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
        <div className="space-y-4">
          {user.upcomingBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{booking.companion}</h4>
                <p className="text-sm text-gray-600">
                  {booking.date} at {booking.time}
                </p>
                <p className="text-sm text-gray-600">{booking.location}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </PlayfulCard>

      {/* Recent Activity */}
      <PlayfulCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {user.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activity.type === 'booking'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </PlayfulCard>
    </div>
  )
}

export default ProfileDashboard 