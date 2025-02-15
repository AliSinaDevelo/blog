'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiCalendar, FiEye } from 'react-icons/fi';

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load featured posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Placeholder posts for development or when API fails
  const placeholderPosts = [
    {
      id: '1',
      title: 'Getting Started with Next.js and TypeScript',
      slug: 'getting-started-with-nextjs-and-typescript',
      content: 'Learn how to build modern web applications with Next.js and TypeScript...',
      coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
      createdAt: '2023-06-01T12:00:00Z',
      views: 1243,
      tags: ['nextjs', 'typescript', 'frontend'],
      author: {
        name: 'Alex Johnson',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    },
    {
      id: '2',
      title: 'Modern Database Techniques for Scalable Applications',
      slug: 'modern-database-techniques',
      content: 'Discover how to implement efficient database solutions that scale with your application...',
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
      createdAt: '2023-05-25T10:30:00Z',
      views: 978,
      tags: ['databases', 'scalability', 'performance'],
      author: {
        name: 'Sarah Williams',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
    },
    {
      id: '3',
      title: 'Building Secure APIs with Node.js',
      slug: 'building-secure-apis-with-nodejs',
      content: 'Learn the best practices for creating secure, reliable API endpoints using Node.js...',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      createdAt: '2023-05-15T09:15:00Z',
      views: 1567,
      tags: ['nodejs', 'security', 'api'],
      author: {
        name: 'Michael Rodriguez',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
      },
    },
  ];

  // Use placeholder posts when loading or when there's an error
  const displayPosts = posts.length > 0 ? posts : placeholderPosts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {loading ? (
        // Skeleton loaders while content is loading
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={`skeleton-${index}`} className="card animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-lg"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between pt-4">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))
      ) : error ? (
        <div className="col-span-3 text-center py-10">
          <p className="text-red-500">{error}</p>
          <p className="mt-4">Showing placeholder content instead</p>
        </div>
      ) : (
        // Actual posts
        displayPosts.map((post) => (
          <div key={post.id} className="card group hover:shadow-lg transition duration-300">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={post.coverImage || 'https://via.placeholder.com/800x450?text=No+Image'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {post.tags && post.tags.length > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-md">
                      {post.tags[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    {post.author?.image && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                        <Image
                          src={post.author.image}
                          alt={post.author.name || 'Author'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{post.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <FiCalendar size={14} className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <FiEye size={14} className="mr-1" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedPosts; 