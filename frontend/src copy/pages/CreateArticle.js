import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      setError('Title, description, and category are required');
      return;
    }

    const articleData = {
      title,
      subtitle,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      authors: authors.split(',').map(author => author.trim()),
      thumbnailPath
    };

    try {
      const response = await axios.post('/api/articles', articleData);
      setSuccess('Article created successfully');
      setError('');
      setTitle('');
      setSubtitle('');
      setDescription('');
      setTags('');
      setCategory('');
      setAuthors('');
      setThumbnailPath('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Create Article</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subtitle:</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Authors (comma separated usernames):</label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>
        <div>
          <label>Thumbnail Path:</label>
          <input
            type="text"
            value={thumbnailPath}
            onChange={(e) => setThumbnailPath(e.target.value)}
          />
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
