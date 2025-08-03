export default function Home() {
  return (
    <main className="min-h-screen bg-[#A1E3F9] flex flex-col items-center text-black px-6 font-sans">
      {/* Quote Section */}
      <section className="flex flex-col items-center text-center max-w-4xl mt-20 mb-16 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-md">
          “Travel is the only thing you buy that makes you richer.”
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-black/80 mb-10">
          PackPal helps you organize your trips and packing lists effortlessly so you can focus on the adventure.
        </p>
        <a
          href="/register"
          className="px-10 py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-900 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl w-full px-4 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-start"
            >
              <div className="mb-4 text-4xl text-black">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-6xl w-full px-4 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(({ name, feedback, avatar }) => (
            <div
              key={name}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col"
            >
              <p className="text-gray-800 mb-6 flex-grow">"{feedback}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-black">
                  {avatar}
                </div>
                <div className="text-black font-semibold">{name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Dummy data
const features = [
  {
    title: 'Smart Packing Lists',
    description: 'Create and customize packing lists tailored to your trips.',
    icon: '📋',
  },
  {
    title: 'Trip Organization',
    description: 'Keep all your trip details and plans in one place.',
    icon: '🗺️',
  },
  {
    title: 'Real-time Updates',
    description: 'Get notified about packing and trip changes instantly.',
    icon: '⏰',
  },
];

const reviews = [
  {
    name: 'Samantha Lee',
    feedback: 'PackPal made my trips so much easier to plan. Highly recommend!',
    avatar: 'SL',
  },
  {
    name: 'Michael Chen',
    feedback: 'I never forget to pack anything important thanks to PackPal.',
    avatar: 'MC',
  },
  {
    name: 'Priya Patel',
    feedback: 'User-friendly and efficient. My travel companion for every trip!',
    avatar: 'PP',
  },
];
