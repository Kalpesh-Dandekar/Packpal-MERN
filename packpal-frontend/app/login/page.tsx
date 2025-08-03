'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage:', data.token);

        alert(data.message || 'Login successful!');
        router.push('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('🔐 Token found in localStorage:', token);
    } else {
      console.log('⚠️ No token in localStorage');
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#A1E3F9] flex justify-center items-center px-6 font-sans">
      <div className="max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden h-[90vh]">
        {/* Left Card */}
        <div className="md:w-1/2 bg-[#10B981] flex flex-col justify-center items-center p-12 text-white rounded-l-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold italic drop-shadow-lg mb-6">
            Welcome Back
          </h2>
          <p className="text-xl md:text-2xl max-w-lg text-center tracking-wide">
            Ready to continue your journey? Log in to access your PackPal account.
          </p>
        </div>

        {/* Right Card */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-10 text-black text-center">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition"
            />

            <button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-semibold text-xl transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
