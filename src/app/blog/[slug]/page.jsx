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
          title: 'Building Modern Web Applications with Go and React',
          slug: 'building-modern-web-applications-with-go-and-react',
          content: `
            <div class="prose dark:prose-invert">
              <p>Modern full-stack development often requires mastering multiple technologies across different domains. Using Go for backend services with React for frontend applications creates a powerful tech stack that combines performance with great user experiences.</p>
              
              <h2>Why Go for Backend Development?</h2>
              
              <p>Go (or Golang) has gained significant popularity for backend development due to several key advantages:</p>
              
              <ul>
                <li><strong>Performance</strong>: Go's compiled nature and efficient memory management make it incredibly fast.</li>
                <li><strong>Concurrency</strong>: Goroutines and channels make handling concurrent operations simple and effective.</li>
                <li><strong>Simplicity</strong>: With a clean syntax and standard formatting, Go code is easy to read and maintain.</li>
                <li><strong>Strong Typing</strong>: The type system helps catch errors at compile time rather than at runtime.</li>
                <li><strong>Built-in Testing Framework</strong>: Go includes testing tools that simplify creating and running tests.</li>
              </ul>
              
              <h2>React for Dynamic Frontend Interfaces</h2>
              
              <p>On the frontend, React continues to be one of the most popular libraries for building user interfaces, thanks to:</p>
              
              <ul>
                <li><strong>Component-Based Architecture</strong>: Breaking UIs into reusable components improves maintainability.</li>
                <li><strong>Virtual DOM</strong>: React's approach to updating the DOM optimizes rendering performance.</li>
                <li><strong>Rich Ecosystem</strong>: The vast array of libraries and tools in the React ecosystem speeds up development.</li>
              </ul>
              
              <h2>Building a RESTful API with Go</h2>
              
              <p>Here's a simple example of a RESTful API in Go using the standard library:</p>
              
              <pre><code>
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type User struct {
    ID    string \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

var users = []User{
    {ID: "1", Name: "Ali Sina", Email: "ali@example.com"},
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func main() {
    http.HandleFunc("/api/users", getUsers)
    log.Fatal(http.ListenAndServe(":8000", nil))
}
              </code></pre>
              
              <h2>Connecting to Go Backend from React</h2>
              
              <p>With our Go API running, we can fetch data in React using modern patterns:</p>
              
              <pre><code>
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  
  return (
    &lt;div&gt;
      &lt;h2&gt;Users&lt;/h2&gt;
      &lt;ul&gt;
        {users.map(user => (
          &lt;li key={user.id}&gt;{user.name} ({user.email})&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}
              </code></pre>
              
              <h2>Deployment Considerations</h2>
              
              <p>When deploying Go and React applications, containerization with Docker simplifies the process:</p>
              
              <ol>
                <li>Build separate containers for frontend and backend</li>
                <li>Use Docker Compose for local development</li>
                <li>Deploy to Kubernetes for production environments</li>
                <li>Implement a CI/CD pipeline for automated testing and deployment</li>
              </ol>
              
              <h2>Conclusion</h2>
              
              <p>The combination of Go and React provides a robust foundation for building modern web applications. Go's performance and simplicity on the backend, coupled with React's component-based architecture on the frontend, create a tech stack that can scale effectively while maintaining developer productivity.</p>
            </div>
          `,
          coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
          published: true,
          authorId: '123',
          author: {
            id: '123',
            name: 'Ali Sina',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Software Developer who thrives on building elegant and practical solutions. Passionate about scalable backend systems, sleek frontend designs, and efficient infrastructure with expertise in Go, Python, and modern JavaScript frameworks.',
          },
          tags: ['golang', 'react', 'fullstack'],
          views: 1586,
          comments: [
            {
              id: 'c1',
              content: 'Great article! I&apos;ve been looking for a good comparison between Go and other backend technologies.',
              authorId: 'u2',
              author: {
                name: 'Sarah Williams',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
              createdAt: '2023-05-26T14:32:00Z',
            },
            {
              id: 'c2',
              content: 'How would you handle authentication between the Go backend and React frontend?',
              authorId: 'u3',
              author: {
                name: 'Michael Rodriguez',
                image: 'https://randomuser.me/api/portraits/men/67.jpg',
              },
              createdAt: '2023-05-27T09:15:00Z',
            },
            {
              id: 'c3',
              content: 'I&apos;ve used this stack in production and can confirm it&apos;s extremely performant!',
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
        <p className="text-gray-600 dark:text-gray-400 mb-6">The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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