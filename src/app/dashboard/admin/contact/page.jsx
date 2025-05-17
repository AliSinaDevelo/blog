'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiMail, FiTrash, FiCheck, FiEye } from 'react-icons/fi';

export default function ContactAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is admin
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/dashboard');
      } else {
        fetchMessages();
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // This is a mock implementation since we haven't created the API endpoint yet
      // In a real implementation, we would fetch from '/api/admin/contact'
      // For now, we'll just use some sample data
      
      const sampleMessages = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Collaboration Request',
          message: 'Hi, I would like to collaborate with you on a web development project. Please let me know if you are interested.',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          subject: 'Question about your blog',
          message: 'Hello, I have a question about your recent blog post on Next.js. Could you provide more details on the authentication setup?',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          subject: 'Job Opportunity',
          message: 'We have an open position for a full-stack developer at our company. Based on your profile, I think you would be a great fit. Would you be interested in learning more?',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        },
      ];
      
      setMessages(sampleMessages);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    // In a real implementation, this would send a request to update the message
    // For now, we'll just update the state locally
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleDelete = async (id) => {
    // In a real implementation, this would send a request to delete the message
    // For now, we'll just update the state locally
    setMessages(prevMessages => 
      prevMessages.filter(msg => msg.id !== id)
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-md mb-6">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      
      {messages.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-400">No contact messages found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`card p-6 ${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`mr-4 p-3 rounded-full ${!message.isRead ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">From: {message.name}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{message.email}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!message.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                      title="Mark as read"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                    title="Delete message"
                  >
                    <FiTrash size={18} />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 