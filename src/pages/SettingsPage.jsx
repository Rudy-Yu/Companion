import React, { useState } from 'react';
import PlayfulInput from '../components/PlayfulInput';
import PlayfulButton from '../components/PlayfulButton';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    notifications: true,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock settings update
    console.log('Settings updated:', settings);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <PlayfulInput
            label="Name"
            name="name"
            value={settings.name}
            onChange={handleChange}
          />
          <PlayfulInput
            label="Email"
            name="email"
            type="email"
            value={settings.email}
            onChange={handleChange}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Enable Notifications</label>
          </div>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <PlayfulButton type="submit">Save Settings</PlayfulButton>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage; 