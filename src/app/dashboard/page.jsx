'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiFileText, FiEdit3, FiPlus, FiBarChart2, FiEye, FiMessageSquare } from 'react-icons/fi';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    posts: 0,
    views: 0,
    comments: 0,
    drafts: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
       
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          posts: 5,
          views: 1294,
          comments: 28,
          drafts: 2,
        });
        
        setRecentPosts([
          {
            id: '1',
            title: 'Getting Started with Next.js and TypeScript',
            slug: 'getting-started-with-nextjs-and-typescript',
            published: true,
            views: 432,
            comments: 12,
            createdAt: '2023-05-15T09:15:00Z',
          },
          {
            id: '2',
            title: 'Modern Database Techniques for Scalable Applications',
            slug: 'modern-database-techniques',
            published: true,
            views: 287,
            comments: 8,
            createdAt: '2023-05-10T14:30:00Z',
          },
          {
            id: '3',
            title: 'The Future of Frontend Development',
            slug: 'future-of-frontend-development',
            published: false,
            views: 0,
            comments: 0,
            createdAt: '2023-05-05T11:45:00Z',
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link 
          href="/dashboard/posts/new" 
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
              <FiFileText className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts</p>
              <h3 className="text-2xl font-bold">{stats.posts}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
              <FiEye className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Views</p>
              <h3 className="text-2xl font-bold">{stats.views}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
              <FiMessageSquare className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
              <h3 className="text-2xl font-bold">{stats.comments}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
              <FiEdit3 className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Drafts</p>
              <h3 className="text-2xl font-bold">{stats.drafts}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link href="/dashboard/posts" className="text-primary hover:text-blue-700">
            View all
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-4 text-left font-semibold">Title</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Views</th>
                <th className="p-4 text-left font-semibold">Comments</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentPosts.map((post) => (
                <tr 
                  key={post.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="p-4">
                    <Link 
                      href={`/dashboard/posts/${post.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    {post.published ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="p-4">{post.views}</td>
                  <td className="p-4">{post.comments}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        aria-label="Edit post"
                      >
                        <FiEdit3 size={18} />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                        aria-label="View post"
                        target="_blank"
                      >
                        <FiEye size={18} />
                      </Link>
                      <Link
                        href={`/dashboard/posts/${post.id}/stats`}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                        aria-label="View stats"
                      >
                        <FiBarChart2 size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 