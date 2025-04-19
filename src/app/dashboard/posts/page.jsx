'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiPlus, FiEdit3, FiEye, FiTrash2, FiAlertCircle, FiSearch } from 'react-icons/fi';

export default function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // For demo purposes, we'll use placeholder data
        // In a real application, you'd fetch from your API
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dummy data - in a real app, fetch from API
        const dummyPosts = [
          {
            id: '1',
            title: 'Building Modern Web Applications with Go and React',
            slug: 'building-modern-web-applications-with-go-and-react',
            content: 'Modern full-stack development often requires mastering multiple technologies across different domains. Using Go for backend services with React for frontend applications creates a powerful tech stack that combines performance with great user experiences...',
            published: true,
            tags: ['golang', 'react', 'fullstack'],
            views: 1586,
            comments: 12,
            createdAt: '2023-06-01T12:00:00Z',
          },
          {
            id: '2',
            title: 'Mastering Microservices with Docker and Kubernetes',
            slug: 'mastering-microservices-with-docker-kubernetes',
            content: 'Exploring how to build, deploy, and scale microservices using Docker containers and Kubernetes orchestration. Learn best practices for containerization and efficient system design...',
            published: true,
            tags: ['docker', 'kubernetes', 'devops'],
            views: 1342,
            comments: 8,
            createdAt: '2023-05-25T10:30:00Z',
          },
          {
            id: '3',
            title: 'Advanced State Management in React with Context API and Hooks',
            slug: 'advanced-state-management-react',
            content: 'Deep dive into React state management beyond Redux. Learn how to effectively use Context API and custom hooks to build maintainable state management systems...',
            published: false,
            tags: ['react', 'javascript', 'frontend'],
            views: 0,
            comments: 0,
            createdAt: '2023-05-15T09:15:00Z',
          },
          {
            id: '4',
            title: 'Performance Optimization Techniques for Go Applications',
            slug: 'performance-optimization-go',
            content: 'Learn advanced strategies for optimizing Go applications. From memory management to concurrency patterns, discover how to make your Go code blazingly fast...',
            published: true,
            tags: ['golang', 'performance', 'backend'],
            views: 1432,
            comments: 16,
            createdAt: '2023-05-05T11:30:00Z',
          },
          {
            id: '5',
            title: 'Building Real-Time Applications with Vue.js and FastAPI',
            slug: 'building-real-time-applications-vue-fastapi',
            content: 'Learn how to combine Vue.js and FastAPI to create responsive, real-time web applications with high performance and excellent developer experience...',
            published: false,
            tags: ['vue', 'fastapi', 'python'],
            views: 0,
            comments: 0,
            createdAt: '2023-04-28T08:20:00Z',
          },
        ];
        
        setPosts(dummyPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle delete post
  const handleDeleteClick = (postId) => {
    setConfirmDelete(postId);
  };

  const handleDeleteConfirm = async (postId) => {
    try {
      // In a real application, you'd make an API call here
      // await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
      
      // For demo, we'll just update the local state
      setPosts(posts.filter(post => post.id !== postId));
      setConfirmDelete(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link 
          href="/dashboard/posts/new" 
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded flex items-center">
          <FiAlertCircle className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          className="input-field pl-10"
          placeholder="Search by title or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Post List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No posts found</p>
          {posts.length > 0 && (
            <button 
              className="text-primary hover:text-blue-700"
              onClick={() => setSearchTerm('')}
            >
              Clear search and show all posts
            </button>
          )}
        </div>
      ) : (
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
              {filteredPosts.map((post) => (
                <tr 
                  key={post.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="p-4">
                    <div>
                      <Link 
                        href={`/dashboard/posts/${post.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {post.title}
                      </Link>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
                        aria-label={`Edit ${post.title}`}
                      >
                        <FiEdit3 size={18} />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                        aria-label={`View ${post.title}`}
                        target="_blank"
                      >
                        <FiEye size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        aria-label={`Delete ${post.title}`}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    {confirmDelete === post.id && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
                          <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                          <p className="mb-6">
                            Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be undone.
                          </p>
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={handleDeleteCancel}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(post.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 