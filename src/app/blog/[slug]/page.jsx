'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiCalendar, 
  FiEye, 
  FiMessageSquare, 
  FiEdit3, 
  FiShare2, 
  FiThumbsUp, 
  FiSend, 
  FiTrash2,
  FiAlertCircle
} from 'react-icons/fi';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { slug } = params;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, this would be an API call
        // const response = await fetch(`/api/posts/${slug}`);
        // const data = await response.json();
        
        // For demo purposes, we'll use a placeholder post
        const dummyPost = {
          id: '1',
          title: 'Getting Started with Next.js and TypeScript',
          slug: 'getting-started-with-nextjs-and-typescript',
          content: `
            <div class="prose dark:prose-invert">
              <p>Next.js has revolutionized the way developers build React applications. Combined with TypeScript, it offers a powerful development experience that helps you catch errors early and build more maintainable applications.</p>
              
              <h2>Why Next.js?</h2>
              
              <p>Next.js provides several key features that make it stand out from other React frameworks:</p>
              
              <ul>
                <li><strong>Server-Side Rendering (SSR)</strong>: Improves performance and SEO.</li>
                <li><strong>Static Site Generation (SSG)</strong>: Pre-renders pages at build time for even better performance.</li>
                <li><strong>API Routes</strong>: Allows you to create API endpoints as part of your Next.js app.</li>
                <li><strong>File-based routing</strong>: Simplifies the routing configuration.</li>
                <li><strong>Image Optimization</strong>: Automatically optimizes images for better performance.</li>
              </ul>
              
              <h2>Adding TypeScript to the Mix</h2>
              
              <p>TypeScript adds static type checking to your JavaScript code, which helps catch errors during development rather than at runtime. This is especially valuable in larger applications or when working with teams.</p>
              
              <p>Here's a simple example of a TypeScript component in Next.js:</p>
              
              <pre><code>
import { GetStaticProps, NextPage } from 'next';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface BlogProps {
  posts: Post[];
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from API
  const posts: Post[] = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 60 // Revalidate every 60 seconds
  };
};

export default Blog;
              </code></pre>
              
              <h2>Setting Up a Next.js Project with TypeScript</h2>
              
              <p>Getting started is simple. Just run:</p>
              
              <pre><code>npx create-next-app@latest --ts my-app</code></pre>
              
              <p>This command creates a new Next.js project with TypeScript configuration already set up for you.</p>
              
              <h2>Conclusion</h2>
              
              <p>The combination of Next.js and TypeScript provides a powerful foundation for building modern web applications. With strong typing, server-side rendering, and a great developer experience, you can build faster, more reliable applications that are easier to maintain over time.</p>
            </div>
          `,
          coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
          published: true,
          authorId: '123',
          author: {
            id: '123',
            name: 'Alex Johnson',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Frontend developer specializing in React and Next.js. Passionate about creating great user experiences and writing clean, maintainable code.',
          },
          tags: ['nextjs', 'typescript', 'frontend'],
          views: 1243,
          comments: [
            {
              id: 'c1',
              content: 'Great article! I learned a lot about integrating TypeScript with Next.js.',
              authorId: 'u2',
              author: {
                name: 'Sarah Williams',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
              createdAt: '2023-05-26T14:32:00Z',
            },
            {
              id: 'c2',
              content: 'Would you recommend using the App Router or Pages Router for new projects?',
              authorId: 'u3',
              author: {
                name: 'Michael Rodriguez',
                image: 'https://randomuser.me/api/portraits/men/67.jpg',
              },
              createdAt: '2023-05-27T09:15:00Z',
            },
            {
              id: 'c3',
              content: 'I\'ve been using this approach in my projects and it works great!',
              authorId: 'u4',
              author: {
                name: 'Emily Chen',
                image: 'https://randomuser.me/api/portraits/women/26.jpg',
              },
              createdAt: '2023-05-28T11:42:00Z',
            },
          ],
          createdAt: '2023-05-25T10:30:00Z',
          updatedAt: '2023-05-25T10:30:00Z',
        };
        
        setPost(dummyPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(`/blog/${slug}`));
      return;
    }
    
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }
    
    try {
      setSubmittingComment(true);
      setCommentError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would be an API call
      // const response = await fetch('/api/comments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content: commentText, postId: post.id }),
      // });
      // const data = await response.json();
      
      // Add the new comment to the local state
      const newComment = {
        id: `c${post.comments.length + 1}`,
        content: commentText,
        authorId: session.user.id,
        author: {
          name: session.user.name,
          image: session.user.image,
        },
        createdAt: new Date().toISOString(),
      };
      
      setPost({
        ...post,
        comments: [newComment, ...post.comments],
      });
      
      setCommentText('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      setCommentError('Failed to submit comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4 text-red-500">
          <FiAlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  const isAuthor = session?.user?.id === post.authorId;
  const isAdmin = session?.user?.role === 'admin';
  const canEdit = isAuthor || isAdmin;

  return (
    <div>
      {/* Post Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/blog"
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            Blog
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 dark:text-gray-200 truncate">
            {post.title}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                src={post.author.image || 'https://via.placeholder.com/40?text=User'}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center">
            <FiCalendar size={16} className="mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          <div className="flex items-center">
            <FiEye size={16} className="mr-1" />
            <span>{post.views} views</span>
          </div>
          
          <div className="flex items-center">
            <FiMessageSquare size={16} className="mr-1" />
            <span>{post.comments.length} comments</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-8 overflow-hidden rounded-lg shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Action buttons */}
      {canEdit && (
        <div className="flex justify-end gap-2 mb-8">
          <Link
            href={`/dashboard/posts/${post.id}/edit`}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <FiEdit3 size={16} /> Edit
          </Link>
        </div>
      )}
      
      {/* Post Content */}
      <article 
        className="prose dark:prose-invert lg:prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Share and Like buttons */}
      <div className="flex flex-wrap gap-4 border-t border-b border-gray-200 dark:border-gray-800 py-6 mb-8">
        <button
          onClick={handleShareClick}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
        >
          <FiShare2 className="mr-2" size={18} />
          <span>Share</span>
        </button>
        
        <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
          <FiThumbsUp className="mr-2" size={18} />
          <span>Like</span>
        </button>
      </div>
      
      {/* Author box */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={post.author.image || 'https://via.placeholder.com/64?text=User'}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{post.author.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {post.author.bio || 'No bio available.'}
            </p>
            <Link
              href={`/blog?author=${post.authorId}`}
              className="text-primary hover:text-blue-700 font-medium"
            >
              View all posts
            </Link>
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <div id="comments" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({post.comments.length})
        </h2>
        
        {/* Comment form */}
        <div className="mb-8">
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-4">
              <textarea
                placeholder={session ? "Add a comment..." : "Sign in to add a comment"}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!session || submittingComment}
                className="input-field min-h-[100px] w-full"
                required
              ></textarea>
              {commentError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {commentError}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!session || submittingComment}
                className="btn-primary flex items-center"
              >
                <FiSend className="mr-2" size={16} />
                {submittingComment ? 'Submitting...' : 'Submit Comment'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Comments list */}
        {post.comments.length > 0 ? (
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div 
                key={comment.id}
                className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between">
                  <div className="flex items-center mb-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={comment.author.image || 'https://via.placeholder.com/32?text=User'}
                        alt={comment.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{comment.author.name}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  {(session?.user?.id === comment.authorId || isAdmin) && (
                    <button 
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete comment"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-2 text-gray-700 dark:text-gray-300 pl-10">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to leave a comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 