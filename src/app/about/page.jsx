'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the GitHub Pages site
    window.location.href = 'https://alisinadevelo.github.io';
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Portfolio...</h1>
        <p className="text-gray-600 dark:text-gray-400">
          If you are not redirected automatically, {' '}
          <a 
            href="https://alisinadevelo.github.io" 
            className="text-primary hover:underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
} 