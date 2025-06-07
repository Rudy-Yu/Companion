import { useState } from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileRoutes from './profile/ProfileRoutes'

function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <ProfileRoutes />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 