'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaPlaneDeparture,
  FaUser,
  FaInfoCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

const iconWrapperClass = 'mr-3 text-lg cursor-pointer';

export default function Sidebar() {
  const pathname = usePathname();

  // We cannot use Link for logout as it requires to clear token and redirect manually
  // So Logout handled separately below the links as a clickable div styled like nav links

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Packages', href: '/packages', icon: <FaBoxOpen /> },
    { name: 'Packing List', href: '/packing-list', icon: <FaClipboardList /> },
    { name: 'Plan New Trip', href: '/plan-trip', icon: <FaPlaneDeparture /> },
    { name: 'Profile', href: '/profile', icon: <FaUser /> },
    { name: 'About', href: '/about', icon: <FaInfoCircle /> },
  ];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col min-h-screen p-6">
      <div className="text-2xl font-bold text-blue-600 mb-10 select-none cursor-default">
        PackPal
      </div>

      <ul className="flex-grow space-y-2">
        {navLinks.map(({ name, href, icon }) => (
          <li key={name}>
            <Link
              href={href}
              className={`flex items-center px-4 py-2 rounded-md font-medium ${
                pathname === href
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className={iconWrapperClass}>{icon}</span>
              {name}
            </Link>
          </li>
        ))}

        {/* Logout item styled like nav link but is a button */}
        <li>
          <div
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-100 hover:text-red-800 cursor-pointer select-none"
          >
            <span className={iconWrapperClass}>
              <FaSignOutAlt />
            </span>
            Logout
          </div>
        </li>
      </ul>
    </nav>
  );
}
