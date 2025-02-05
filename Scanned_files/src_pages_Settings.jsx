import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.patch('/users/profile', {
        name: formData.name,
        email: formData.email
      });
      setNotification({ type: 'success', message: 'Profile updated successfully' });
    } catch (error) {
      setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to update profile' });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setNotification({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    try {
      await api.patch('/users/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setNotification({ type: 'success', message: 'Password updated successfully' });
    } catch (error) {
      setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to update password' });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {notification && (
        <div className={`p-4 mb-4 rounded ${
          notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={updateProfile} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={updatePassword} className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </Card>
    </div>
  );
};

export default Settings;