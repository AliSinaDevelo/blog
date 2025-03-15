'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiFileText, FiUser, FiSettings, FiMenu, FiX } from 'react-icons/fi';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render dashboard if authenticated
  if (status === 'authenticated' && session) {
    const isAdmin = session.user.role === 'admin';
    
    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: FiHome },
      { name: 'My Posts', href: '/dashboard/posts', icon: FiFileText },
      { name: 'Profile', href: '/dashboard/profile', icon: FiUser },
      { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
    ];

    if (isAdmin) {
      navigation.push(
        { name: 'Admin', href: '/dashboard/admin', icon: FiSettings }
      );
    }

    const isActive = (path) => {
      return pathname === path || pathname.startsWith(`${path}/`);
    };

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return (
      <div className="flex h-full">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DevBlog
              </Link>
              <button
                className="lg:hidden"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        isActive(item.href)
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User info */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden bg-white dark:bg-gray-900 shadow-sm p-4 flex items-center">
            <button
              className="text-gray-600 dark:text-gray-300 mr-3"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DevBlog Dashboard
            </h1>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return null;
} 