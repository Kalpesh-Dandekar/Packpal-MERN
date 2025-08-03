'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  email: string;
}

interface Trip {
  _id: string;
  tripName: string;
  location: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: string;
  packageType: string;
  totalCost: number;
  status: string;
  isFavorite: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [favoriteTrip, setFavoriteTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.status === 401) {
          router.push('/login');
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        const tripsRes = await fetch('http://localhost:5000/api/plan-trip', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tripsData = await tripsRes.json();
        const allTrips: Trip[] = tripsData.trips || [];
        setTotalTrips(allTrips.length);

        const upcoming = allTrips.filter((trip) => trip.status === 'upcoming');
        setUpcomingTrips(upcoming);

        const fav = allTrips.find((trip) => trip.isFavorite);
        setFavoriteTrip(fav || null);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // DELETE handler
  const handleDelete = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete a trip.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/plan-trip/${tripId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        alert('Failed to delete trip: ' + (errData.message || res.statusText));
        return;
      }

      alert('Trip deleted successfully!');

      setUpcomingTrips((prev) => prev.filter((trip) => trip._id !== tripId));
      setTotalTrips((prev) => prev - 1);

      if (favoriteTrip?._id === tripId) {
        setFavoriteTrip(null);
      }
    } catch (error) {
      alert('Server error. Please try again.');
      console.error(error);
    }
  };

  // MARK COMPLETED handler
  const handleMarkCompleted = async (tripId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to update a trip.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/plan-trip/${tripId}/complete`, {
        method: 'PATCH', // Corrected method here
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        alert('Failed to mark trip as completed: ' + (errData.message || res.statusText));
        return;
      }

      alert('Trip marked as completed!');

      setUpcomingTrips((prev) => prev.filter((trip) => trip._id !== tripId));
    } catch (error) {
      alert('Server error. Please try again.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#A1E3F9] to-[#FFFFFF] p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col space-y-10">

        {/* Header with Welcome and Button */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold mb-1">
              Welcome back, <span className="text-pink-600">{user?.username}</span>!
            </h1>
            <p className="text-gray-600">Here’s a quick overview of your PackPal account.</p>
          </div>

          <button
            onClick={() => router.push('/plan-trip')}
            className="bg-pink-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Plan New Trip
          </button>
        </header>

        {/* Total Trips */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-48 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Trips Done</h2>
          <p className="text-4xl font-bold text-pink-600">{totalTrips}</p>
        </section>

        {/* Upcoming Trips */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Upcoming Trips</h2>
          {upcomingTrips.length === 0 ? (
            <p className="text-gray-500 italic">No upcoming trips planned.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <div
                  key={trip._id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative flex flex-col justify-between"
                  style={{ minHeight: '220px' }}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{trip.tripName || 'Unnamed Trip'}</h3>
                    <p><span className="font-medium">Location:</span> {trip.location}</p>
                    <p>
                      <span className="font-medium">Dates:</span>{' '}
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                    <p><span className="font-medium">Travelers:</span> {trip.travelers}</p>
                    <p><span className="font-medium">Type:</span> {trip.tripType}</p>
                    <p><span className="font-medium">Package:</span> {trip.packageType}</p>
                    <p><span className="font-medium">Cost:</span> ₹{trip.totalCost}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-4">
                    {/* Mark Completed */}
                    <button
                      onClick={() => handleMarkCompleted(trip._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      aria-label={`Mark trip ${trip.tripName || 'Unnamed Trip'} as completed`}
                    >
                      Mark Completed
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      aria-label={`Delete trip ${trip.tripName || 'Unnamed Trip'}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorite Trip */}
        <section className="bg-pink-100 rounded-lg shadow-md p-6 border border-pink-400 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-pink-700">Your Favorite Trip</h2>
          {favoriteTrip ? (
            <>
              <h3 className="text-xl font-semibold">{favoriteTrip.tripName || 'Unnamed Trip'}</h3>
              <p><span className="font-medium">Location:</span> {favoriteTrip.location}</p>
              <p>
                <span className="font-medium">Dates:</span>{' '}
                {formatDate(favoriteTrip.startDate)} - {formatDate(favoriteTrip.endDate)}
              </p>
              <p><span className="font-medium">Travelers:</span> {favoriteTrip.travelers}</p>
              <p><span className="font-medium">Type:</span> {favoriteTrip.tripType}</p>
              <p><span className="font-medium">Package:</span> {favoriteTrip.packageType}</p>
              <p><span className="font-medium">Cost:</span> ₹{favoriteTrip.totalCost}</p>
              <p className="mt-4 italic text-pink-700">This trip is your favorite! 💖 Enjoy planning more amazing trips!</p>
            </>
          ) : (
            <p className="italic text-pink-700">You haven't marked any trip as favorite yet.</p>
          )}
        </section>

        {/* Quote */}
        <section className="text-center text-2xl italic font-semibold text-gray-700">
          <q>
            "Travel is the only thing you buy that makes you richer."
          </q>
        </section>

        {/* Thank you */}
        <footer className="text-center text-gray-600 text-lg mt-12">
          Thank you for choosing PackPal for your travel adventures! 🌍
        </footer>
      </div>
    </main>
  );
}
