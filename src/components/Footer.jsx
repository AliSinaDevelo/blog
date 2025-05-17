'use client';

import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 w-full">
      <div className="wrapper py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AliSina Dev
            </Link>
            <p className="mt-2 text-secondary-text dark:text-gray-400 text-sm">
              I build elegant and practical solutions to complex problems. From scalable backend systems to sleek frontend designs, I love bringing ideas to life.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-secondary-text dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Find Me</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/AliSinaDevelo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://x.com/AlisinaDevelo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/alisina-karimi-43a834224/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="mailto:alisinadevelo@gmail.com"
                className="text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                aria-label="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-secondary-text dark:text-gray-400 text-sm">
          <p>© {currentYear} Alisina Karimi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 