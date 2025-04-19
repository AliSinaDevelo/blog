'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const isActive = (path) => {
    return pathname === path ? 'text-blue-600 dark:text-blue-400' : '';
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="wrapper py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AliSina Dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`hover:text-blue-600 transition ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/blog" className={`hover:text-blue-600 transition ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link href="/about" className={`hover:text-blue-600 transition ${isActive('/about')}`}>
              About
            </Link>
            <Link href="/contact" className={`hover:text-blue-600 transition ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>

          {/* Auth and Theme Controls (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={handleThemeChange}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            )}

            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="hover:text-blue-600 transition">
                  Dashboard
                </Link>
                {session.user.image ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User avatar'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                )}
                <button
                  onClick={() => signOut()}
                  className="hover:text-red-500 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button
                onClick={handleThemeChange}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="wrapper py-4 flex flex-col space-y-4">
            <Link href="/" className={`hover:text-blue-600 transition ${isActive('/')}`} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/blog" className={`hover:text-blue-600 transition ${isActive('/blog')}`} onClick={closeMenu}>
              Blog
            </Link>
            <Link href="/about" className={`hover:text-blue-600 transition ${isActive('/about')}`} onClick={closeMenu}>
              About
            </Link>
            <Link href="/contact" className={`hover:text-blue-600 transition ${isActive('/contact')}`} onClick={closeMenu}>
              Contact
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              {session ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    {session.user.image ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User avatar'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        {session.user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span>{session.user.name}</span>
                  </div>
                  <Link href="/dashboard" className="hover:text-blue-600 transition" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-left hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/auth/signin"
                    className="text-primary hover:text-blue-700 transition"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="btn-primary inline-block text-center"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 