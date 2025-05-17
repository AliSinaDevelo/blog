import Link from 'next/link';
import Image from 'next/image';
import FeaturedPosts from '@/components/FeaturedPosts';
import { FiCode, FiDatabase, FiServer, FiLayers } from 'react-icons/fi';

export default async function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="block">Modern coding</span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">insights & tutorials</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay ahead with the latest software engineering trends, best practices, and deep technical insights from my development journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog" className="btn-primary text-center">
                Read My Articles
              </Link>
              <Link href="/auth/signup" className="border border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded-md transition duration-300 text-center">
                Join Me
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-secondary/60 z-10 mix-blend-multiply"></div>
            <Image 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
              alt="Coding on laptop" 
              fill
              priority
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Articles</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Articles I&apos;ve handpicked to help you level up your development skills
          </p>
        </div>
        <FeaturedPosts />
      </section>

      {/* Topics Section */}
      <section className="py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Topics I Write About</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Dive into areas I&apos;m passionate about sharing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <FiCode size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Programming</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Best practices, patterns, and coding techniques I&apos;ve learned
            </p>
            <Link href="/blog?tag=programming" className="text-primary hover:text-blue-700 mt-auto">
              Read More →
            </Link>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <FiDatabase size={28} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Databases</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              My experiences with data modeling and storage solutions
            </p>
            <Link href="/blog?tag=databases" className="text-primary hover:text-blue-700 mt-auto">
              Read More →
            </Link>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <FiServer size={28} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              How I approach APIs, services, and backend architecture
            </p>
            <Link href="/blog?tag=backend" className="text-primary hover:text-blue-700 mt-auto">
              Read More →
            </Link>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
              <FiLayers size={28} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              My take on UI/UX, frameworks, and modern web apps
            </p>
            <Link href="/blog?tag=frontend" className="text-primary hover:text-blue-700 mt-auto">
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-white">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Connect With Me</h2>
          <p className="text-lg opacity-90">
            I&apos;d love to hear from you! Sign up to receive updates or reach out with questions, ideas, or just to say hi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/signup" className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-md transition duration-300 text-center">
              Sign Up
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-6 rounded-md transition duration-300 text-center">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

