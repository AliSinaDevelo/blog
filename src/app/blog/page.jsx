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
        
        // Build query params
        const params = new URLSearchParams();
        if (tag) params.set('tag', tag);
        if (searchQuery) params.set('search', searchQuery);
        params.set('page', currentPage.toString());
        params.set('pageSize', '6');
        
        const response = await fetch(`/api/posts?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.posts || []);
        setTotalPages(data.pagination?.totalPages || 1);
        
        // Fetch all tags for filtering
        const tagsResponse = await fetch('/api/tags');
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(tagsData.tags || []);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tag, searchQuery, currentPage]);

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
        <p className="text-secondary-text dark:text-gray-300 max-w-2xl mx-auto">
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
                className="text-sm text-muted-text dark:text-gray-400 hover:text-primary dark:hover:text-primary"
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
            <span className="text-muted-text dark:text-gray-400 mr-2">Active filters:</span>
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
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-secondary-text dark:text-gray-400 mb-4">
            {tag
              ? `No posts found with tag "${tag}"`
              : searchQuery
              ? `No posts matching "${searchQuery}"`
              : 'No posts available at the moment. Create some posts to see them here.'}
          </p>
          {(tag || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          )}
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
                  <p className="text-secondary-text dark:text-gray-400 mb-4 line-clamp-2">
                    {post.content.replace(/<[^>]*>/g, '')}
                  </p>
                  <div className="flex justify-between text-sm text-muted-text dark:text-gray-400">
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
                  <div className="flex justify-between mt-4 text-sm text-muted-text dark:text-gray-400">
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