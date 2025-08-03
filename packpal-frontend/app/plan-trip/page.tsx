'use client';

import { useEffect, useState } from 'react';

type Location = 'Goa' | 'Manali' | 'Leh' | 'Rishikesh' | 'Kerala';
type PackageType = 'Basic' | 'Deluxe' | 'Premium';

export default function PlanNewTrip() {
  const [formData, setFormData] = useState({
    tripName: '',
    location: '' as Location | '',
    startDate: '',
    endDate: '',
    travelers: 1,
    tripType: '',
    packageType: '' as PackageType | '',
    status: 'upcoming',
    isFavorite: false,
  });

  const [totalCost, setTotalCost] = useState(0);

  const locations: Location[] = ['Goa', 'Manali', 'Leh', 'Rishikesh', 'Kerala'];
  const tripTypes = ['Leisure', 'Adventure', 'Business', 'Family', 'Romantic'];
  const packageTypes: PackageType[] = ['Basic', 'Deluxe', 'Premium'];

  const packagePrices: Record<Location, Record<PackageType, number>> = {
    Goa: { Basic: 2000, Deluxe: 5000, Premium: 10000 },
    Manali: { Basic: 2500, Deluxe: 6000, Premium: 11000 },
    Leh: { Basic: 3000, Deluxe: 7000, Premium: 12000 },
    Rishikesh: { Basic: 2200, Deluxe: 5200, Premium: 10200 },
    Kerala: { Basic: 2800, Deluxe: 5800, Premium: 10800 },
  };

  useEffect(() => {
    if (
      formData.location &&
      formData.packageType &&
      formData.travelers > 0 &&
      packagePrices[formData.location] &&
      packagePrices[formData.location][formData.packageType]
    ) {
      const costPerTraveler = packagePrices[formData.location][formData.packageType];
      setTotalCost(costPerTraveler * formData.travelers);
    } else {
      setTotalCost(0);
    }
  }, [formData.location, formData.packageType, formData.travelers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'isFavorite') {
      // This will be handled separately via checkbox onChange
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'travelers' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, isFavorite: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to plan a trip.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tripName: formData.tripName,
          location: formData.location,
          startDate: formData.startDate,
          endDate: formData.endDate,
          travelers: formData.travelers,
          tripType: formData.tripType,
          packageType: formData.packageType,
          totalCost,
          status: formData.status,
          isFavorite: formData.isFavorite,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Failed to plan trip: ' + (errorData.message || response.statusText));
        return;
      }

      alert('Trip planned successfully!');

      setFormData({
        tripName: '',
        location: '',
        startDate: '',
        endDate: '',
        travelers: 1,
        tripType: '',
        packageType: '',
        status: 'upcoming',
        isFavorite: false,
      });
      setTotalCost(0);
    } catch (error) {
      alert('Server error. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#A1E3F9] p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Plan New Trip</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <div>
          <label
            htmlFor="tripName"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Trip Name (optional)
          </label>
          <input
            type="text"
            id="tripName"
            name="tripName"
            value={formData.tripName}
            onChange={handleChange}
            placeholder="e.g. Summer Vacation 2025"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Location *
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-6">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="block text-gray-900 font-semibold mb-2 text-lg"
            >
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="endDate"
              className="block text-gray-900 font-semibold mb-2 text-lg"
            >
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="travelers"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Number of Travelers *
          </label>
          <input
            type="number"
            id="travelers"
            name="travelers"
            min={1}
            value={formData.travelers}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="tripType"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Trip Type *
          </label>
          <select
            id="tripType"
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          >
            <option value="">Select Trip Type</option>
            {tripTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="packageType"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Package Option *
          </label>
          <select
            id="packageType"
            name="packageType"
            value={formData.packageType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          >
            <option value="">Select Package Option</option>
            {packageTypes.map((pkg) => (
              <option key={pkg} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>
        </div>

        {/* New Status Dropdown */}
        <div>
          <label
            htmlFor="status"
            className="block text-gray-900 font-semibold mb-2 text-lg"
          >
            Trip Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base bg-white"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Favorite Checkbox */}
        <div className="flex items-center space-x-3 mt-4">
          <input
            type="checkbox"
            id="isFavorite"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isFavorite" className="text-gray-900 font-semibold">
            Mark as Favorite Trip
          </label>
        </div>

        <div className="text-right text-xl font-semibold text-gray-900">
          Total Cost: ₹{totalCost}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Plan Trip
        </button>
      </form>
    </div>
  );
}
