import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/categories/${id}`);
        setName(response.data.name);
        setAbbreviation(response.data.abbreviation);
      } catch (err) {
        setError('Failed to load category');
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !abbreviation) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.put(`/api/categories/${id}`, { name, abbreviation });
      setSuccess('Category updated successfully');
      setError('');
      history.push('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Edit Category</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Abbreviation:</label>
          <input
            type="text"
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
