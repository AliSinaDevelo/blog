'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiEye, FiMessageSquare, FiFilter, FiSearch, FiLoader } from 'react-icons/fi';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams.get('tag');
  const searchQuery = searchParams.get('search');
  const currentPage = parseInt(searchParams.get('page') || '1');
  
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // These would normally come from an API
        const dummyPosts = [
          {
            id: '1',
            title: 'Building Modern Web Applications with Go and React',
            slug: 'building-modern-web-applications-with-go-and-react',
            content: 'Modern full-stack development often requires mastering multiple technologies across different domains. Using Go for backend services with React for frontend applications creates a powerful tech stack that combines performance with great user experiences...',
            coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
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
            coverImage: 'https://images.unsplash.com/photo-1621498892236-ebb6c1e3fd37',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            tags: ['docker', 'kubernetes', 'devops'],
            views: 1342,
            comments: 8,
            createdAt: '2023-05-25T10:30:00Z',
          },
          {
            id: '3',
            title: 'Building Real-Time Applications with Vue.js and FastAPI',
            slug: 'building-real-time-applications-vue-fastapi',
            content: 'Learn how to combine Vue.js and FastAPI to create responsive, real-time web applications with high performance and excellent developer experience...',
            coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            tags: ['vue', 'fastapi', 'python'],
            views: 1247,
            comments: 14,
            createdAt: '2023-05-15T09:15:00Z',
          },
          {
            id: '4',
            title: 'Advanced State Management in React with Context API and Hooks',
            slug: 'advanced-state-management-react',
            content: 'Deep dive into React state management beyond Redux. Learn how to effectively use Context API and custom hooks to build maintainable state management systems...',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            tags: ['react', 'javascript', 'frontend'],
            views: 1892,
            comments: 21,
            createdAt: '2023-05-10T14:45:00Z',
          },
          {
            id: '5',
            title: 'Performance Optimization Techniques for Go Applications',
            slug: 'performance-optimization-go',
            content: 'Learn advanced strategies for optimizing Go applications. From memory management to concurrency patterns, discover how to make your Go code blazingly fast...',
            coverImage: 'https://images.unsplash.com/photo-1605745341040-cb968ebd662e',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            tags: ['golang', 'performance', 'backend'],
            views: 1432,
            comments: 16,
            createdAt: '2023-05-05T11:30:00Z',
          },
          {
            id: '6',
            title: 'Building Scalable Systems with PostgreSQL and TimescaleDB',
            slug: 'scalable-systems-postgresql-timescaledb',
            content: 'Strategies for designing and implementing high-performance database systems using PostgreSQL and TimescaleDB for time-series data applications...',
            coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
            author: {
              name: 'Ali Sina',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            tags: ['databases', 'postgresql', 'performance'],
            views: 1054,
            comments: 11,
            createdAt: '2023-04-28T08:20:00Z',
          },
        ];
        
        // Extract all tags from posts for the filter
        const allTags = Array.from(
          new Set(dummyPosts.flatMap(post => post.tags))
        ).sort();
        
        setTags(allTags);
        
        // Filter posts by tag if provided
        let filteredPosts = dummyPosts;
        if (tag) {
          filteredPosts = dummyPosts.filter(post => 
            post.tags.includes(tag.toLowerCase())
          );
        }
        
        // Filter by search term if provided
        if (searchQuery) {
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        
        setPosts(filteredPosts);
        setTotalPages(Math.ceil(filteredPosts.length / 6));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tag, searchQuery]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (tag) params.set('tag', tag);
    
    router.push(`/blog?${params.toString()}`);
  };

  const handleTagFilter = (selectedTag) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    
    if (tag === selectedTag) {
      // If clicking the already selected tag, remove the filter
      router.push(`/blog?${params.toString()}`);
    } else {
      params.set('tag', selectedTag);
      router.push(`/blog?${params.toString()}`);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    router.push('/blog');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Dive into articles, tutorials, and insights on software engineering, web development, and tech trends.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <form onSubmit={handleSearch} className="flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pr-10 w-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                aria-label="Search"
              >
                <FiSearch />
              </button>
            </div>
          </form>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFilters}
              className="flex items-center text-sm gap-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary transition"
            >
              <FiFilter size={16} />
              <span className="hidden sm:inline">Filters</span>
              {tag && <span className="ml-1 text-xs bg-primary text-white rounded-full px-2 py-0.5">1</span>}
            </button>
            
            {(tag || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        
        {/* Tag filters */}
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="font-medium mb-2">Filter by tag</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTagFilter(t)}
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    tag === t
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {(tag || searchQuery) && (
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
            {tag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mr-2">
                Tag: {tag}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                Search: {searchQuery}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <FiLoader className="animate-spin text-primary mr-2" size={24} />
          <span>Loading posts...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {tag
              ? `No posts found with tag "${tag}"`
              : searchQuery
              ? `No posts matching "${searchQuery}"`
              : 'No posts available at the moment.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="card group hover:shadow-lg transition duration-300">
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
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.content}
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
                    <div className="flex items-center">
                      <FiCalendar size={14} className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiEye size={14} className="mr-1" />
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <FiMessageSquare size={14} className="mr-1" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && posts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.push(`/blog?page=${currentPage - 1}`)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => router.push(`/blog?page=${pageNumber}`)}
                  className={`w-10 h-10 rounded-md ${
                    currentPage === pageNumber
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => router.push(`/blog?page=${currentPage + 1}`)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 