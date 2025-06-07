import { Routes, Route } from 'react-router-dom'
import ProfileDashboard from './ProfileDashboard'
import ProfileInfo from './ProfileInfo'
import ProfileBooking from './ProfileBooking'
import ProfileHistory from './ProfileHistory'
import ProfileMessages from './ProfileMessages'
import ProfileSettings from './ProfileSettings'

function ProfileRoutes() {
  return (
    <Routes>
      <Route index element={<ProfileDashboard />} />
      <Route path="info" element={<ProfileInfo />} />
      <Route path="booking" element={<ProfileBooking />} />
      <Route path="history" element={<ProfileHistory />} />
      <Route path="messages" element={<ProfileMessages />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Routes>
  )
}

export default ProfileRoutes 