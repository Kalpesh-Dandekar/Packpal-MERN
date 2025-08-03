'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Registered successfully!');
        router.push('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Register error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-[#A1E3F9] flex justify-center items-center px-6 font-sans">
      <div className="max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Card: Welcome Quote */}
        <div className="md:w-1/2 bg-[#10B981] flex flex-col justify-center items-center p-12 text-white rounded-l-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold italic drop-shadow-lg mb-6">
            Welcome to PackPal
          </h2>
          <p className="text-xl md:text-2xl max-w-lg text-center tracking-wide">
            “Your perfect travel companion to organize, pack, and explore.”
          </p>
        </div>

        {/* Right Card: Register Form */}
        <div className="md:w-1/2 p-12">
          <h1 className="text-4xl font-bold mb-10 text-black text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'username', type: 'text', placeholder: 'Username' },
              { name: 'email', type: 'email', placeholder: 'Email' },
              { name: 'phone', type: 'tel', placeholder: 'Phone Number' },
              { name: 'city', type: 'text', placeholder: 'City' },
              { name: 'district', type: 'text', placeholder: 'District' },
              { name: 'password', type: 'password', placeholder: 'Password' },
            ].map(({ name, type, placeholder }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={(form as any)[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition"
              />
            ))}

            <button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-semibold text-xl transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
