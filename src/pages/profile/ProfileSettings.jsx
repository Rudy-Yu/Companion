import { useState } from 'react'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function ProfileSettings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      showLastSeen: true
    },
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD'
  })

  const handleNotificationChange = (type) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }))
  }

  const handlePrivacyChange = (type, value) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }))
  }

  const handlePreferenceChange = (type, value) => {
    setSettings((prev) => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <PlayfulCard className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive push notifications on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </PlayfulCard>

      {/* Privacy Settings */}
      <PlayfulCard className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Profile Visibility</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Show Online Status</h3>
              <p className="text-sm text-gray-500">Let others see when you're online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.privacy.showOnlineStatus}
                onChange={() => handlePrivacyChange('showOnlineStatus', !settings.privacy.showOnlineStatus)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </PlayfulCard>

      {/* Preferences */}
      <PlayfulCard className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Asia/Tokyo">Japan Time (JT)</option>
              <option value="Asia/Seoul">Korea Time (KT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="KRW">KRW (₩)</option>
            </select>
          </div>
        </div>
      </PlayfulCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <PlayfulButton variant="primary">Save Changes</PlayfulButton>
      </div>
    </div>
  )
}

export default ProfileSettings 