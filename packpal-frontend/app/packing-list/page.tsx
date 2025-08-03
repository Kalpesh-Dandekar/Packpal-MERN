'use client';

import React, { useState } from 'react';

const packingData: Record<
  string,
  Record<
    string,
    {
      Clothing: string[];
      Accessories: string[];
      Gadgets: string[];
      Documents: string[];
      Miscellaneous: string[];
    }
  >
> = {
  hot: {
    january: {
      Clothing: ['Lightweight T-shirts', 'Shorts', 'Swimwear'],
      Accessories: ['Sunglasses', 'Sun hat', 'Sunscreen (SPF 50+)'],
      Gadgets: ['Phone charger', 'Portable fan'],
      Documents: ['ID card', 'Travel insurance'],
      Miscellaneous: ['Water bottle', 'Flip flops'],
    },
    // ... rest of months same as you shared
  },
  rainy: {
    january: {
      Clothing: ['Waterproof jacket', 'Quick-dry clothes'],
      Accessories: ['Umbrella', 'Waterproof bag cover'],
      Gadgets: ['Power bank', 'Phone charger'],
      Documents: ['ID card', 'Travel insurance'],
      Miscellaneous: ['Waterproof shoes', 'Towel'],
    },
    // ... rest of months
  },
  cold: {
    january: {
      Clothing: ['Thermal wear', 'Heavy coat', 'Gloves'],
      Accessories: ['Scarf', 'Beanie'],
      Gadgets: ['Phone charger'],
      Documents: ['ID card', 'Travel insurance'],
      Miscellaneous: ['Moisturizer'],
    },
    // ... rest of months
  },
};

const weathers = ['hot', 'rainy', 'cold'];
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export default function PackingListPage() {
  const [weather, setWeather] = useState('hot');
  const [month, setMonth] = useState('january');

  const currentPacking = packingData[weather]?.[month];

  return (
    <section className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Packing List</h1>

      {/* Selection Controls */}
      <div className="flex gap-6 mb-8 flex-wrap max-w-md">
        <div>
          <label className="block mb-2 font-semibold">Select Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {weathers.map((w) => (
              <option key={w} value={w}>
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Select Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Packing List */}
      {currentPacking ? (
        <div className="space-y-6 max-w-4xl">
          {Object.entries(currentPacking).map(([category, items]) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {category}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-base">
                {items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No packing data found for selected options.</p>
      )}
    </section>
  );
}
