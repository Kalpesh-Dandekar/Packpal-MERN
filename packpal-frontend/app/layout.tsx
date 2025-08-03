'use client';

import './globals.css';          // Import your global CSS here
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showNavbar = ['/', '/login', '/register'].includes(pathname);

  return (
    <html lang="en">
      <body>
        {showNavbar ? (
          <>
            <Navbar />
            <main>{children}</main>
          </>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-grow p-8">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
