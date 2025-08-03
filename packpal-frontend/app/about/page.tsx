'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#A1E3F9] font-sans p-12 flex flex-col items-center">
      <div className="bg-white max-w-4xl rounded-2xl shadow-lg p-10 space-y-10">
        <h1 className="text-5xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-3">
          About PackPal
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          PackPal is your ultimate travel companion designed to simplify your trip planning.
          Whether you seek budget-friendly packages or luxury experiences, PackPal offers personalized
          travel options tailored just for you.
        </p>

        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Why Choose PackPal?</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li className="hover:text-blue-600 transition-colors cursor-default">
              Curated packages organized by location and preferences
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-default">
              User-friendly interface for seamless planning
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-default">
              Real-time updates and easy access to trip details
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-default">
              Dedicated support to ensure a smooth and memorable journey
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">What Makes Us Different?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Unlike other platforms, PackPal focuses on personalization and simplicity,
            making travel planning stress-free and enjoyable.
          </p>
        </section>
      </div>

      <footer className="mt-16 text-center text-gray-600 italic font-extrabold text-xl select-none">
        Developed by <span className="text-blue-600">Kalpesh K. Dandekar</span> ✨
      </footer>
    </main>
  );
}
