'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FiSave, FiEye, FiImage, FiX, FiAlertCircle } from 'react-icons/fi';

// Dynamically import the React Quill component to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const PostForm = ({ post, isEdit = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  // Set initial form data if editing
  useEffect(() => {
    if (isEdit && post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        tags: post.tags || [],
        published: post.published || false,
      });
    }
  }, [isEdit, post]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const url = isEdit ? `/api/posts/${post.slug}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Redirect to the post or back to the dashboard
      if (formData.published) {
        router.push(`/blog/${data.post.slug}`);
      } else {
        router.push('/dashboard/posts');
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
      {error && (
        <div className="mb-6 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded flex items-center">
          <FiAlertCircle className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
            Cover Image URL
          </label>
          <div className="flex">
            <div className="relative flex-grow">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiImage />
              </span>
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          {formData.coverImage && (
            <div className="mt-2">
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="h-40 w-full object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags
          </label>
          <div className="flex">
            <input
              type="text"
              id="tagInput"
              value={tagInput}
              onChange={handleTagInputChange}
              className="input-field flex-grow"
              placeholder="Enter tags and press Add"
            />
            <button
              type="button"
              onClick={addTag}
              className="ml-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition duration-300"
            >
              Add
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FiX size={16} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <button
              type="button"
              onClick={togglePreview}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <FiEye className="mr-1" />
              {preview ? 'Edit' : 'Preview'}
            </button>
          </div>

          {preview ? (
            <div
              className="prose dark:prose-invert max-w-none border border-gray-300 dark:border-gray-700 rounded-md p-4 min-h-[300px] bg-white dark:bg-gray-800 overflow-auto"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          ) : (
            <div className="border rounded-md overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                className="h-80 bg-white dark:bg-gray-800"
              />
            </div>
          )}
        </div>

        {/* Publishing Options */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary rounded border-gray-300 dark:border-gray-700 focus:ring-primary dark:bg-gray-700"
          />
          <label
            htmlFor="published"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Publish immediately
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center"
          >
            <FiSave className="mr-2" />
            {loading
              ? isEdit
                ? 'Updating...'
                : 'Creating...'
              : isEdit
              ? 'Update Post'
              : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm; 