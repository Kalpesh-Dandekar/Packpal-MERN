import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-black cursor-pointer select-none">
        PackPal
      </div>
      <div className="space-x-8 text-black font-medium text-lg">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
        <Link href="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  );
}
