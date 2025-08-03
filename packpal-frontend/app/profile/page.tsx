'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    district: '',
  });

  const [message, setMessage] = useState('');

  // Backend base URL — update if your backend runs on another port or domain
  const API_BASE_URL = 'http://localhost:5000';

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Please login first');
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setMessage(`Error: ${errorData.message || 'Failed to load profile'}`);
          return;
        }

        const data = await res.json();

        // data.user from backend
        setFormData({
          username: data.user.username || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          city: data.user.city || '',
          district: data.user.district || '',
        });
      } catch (err) {
        setMessage('Network error while loading profile');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`❌ Failed to update profile: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage('❌ Network error while updating profile');
      console.error('Error updating profile:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[#A1E3F9] font-sans text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Profile</h1>

      {message && (
        <p className={`mb-6 font-semibold ${message.startsWith('✅') ? 'text-green-700' : 'text-red-700'}`}>
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-6xl"
      >
        {/* Username */}
        <div>
          <label className="block mb-1 font-medium text-black">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium text-black">Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full bg-gray-200 rounded-md border border-gray-300 px-4 py-3 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium text-black">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium text-black">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-white rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium text-black">District</label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full bg-white rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="bg-red-600 text-white rounded-md px-6 py-3 hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-6 py-3 hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
