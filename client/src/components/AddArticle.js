import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';





const ARTICLES_URL = '/articles';
const CATEGORIES_URL = '/categories';
const CURRENT_USER_URL = '/profile';
const AddArticle = ({ history }) => {
const [form, setForm] = useState({
  title: '',
  header: '',
  subheader: '',
  description: '',
  category: '',
  articlePath: '',
  thumbnailPath: '',
  authors: []
});
const [categories, setCategories] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  // Fetch categories
  axios.get(CATEGORIES_URL)
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the categories!', error);
    });

  // Fetch current user
  axios.get(CURRENT_USER_URL)
    .then(response => {
      setCurrentUser(response.data._id);
      setForm(prevForm => ({
        ...prevForm,
        authors: [response.data._id]
      }));
    })
    .catch(error => {
      console.error('There was an error fetching the current user!', error);
    });
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAuthor = () => {
    setForm(prevForm => ({
      ...prevForm,
      authors: [...prevForm.authors, '']
    }));
  };

  const handleRemoveAuthor = (index) => {
    setForm(prevForm => {
      const authors = [...prevForm.authors];
      authors.splice(index, 1);
      return { ...prevForm, authors };
    });
  };

  const handleAuthorChange = (e, index) => {
    const { value } = e.target;
    setForm(prevForm => {
      const authors = [...prevForm.authors];
      authors[index] = value;
      return { ...prevForm, authors };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    axios.post(ARTICLES_URL, form)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error creating the article!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Header:</label>
        <input type="text" name="header" value={form.header} onChange={handleChange} required />
      </div>
      <div>
        <label>Subheader:</label>
        <input type="text" name="subheader" value={form.subheader} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Article Path:</label>
        <input type="text" name="articlePath" value={form.articlePath} onChange={handleChange} required />
      </div>
      <div>
        <label>Thumbnail Path:</label>
        <input type="text" name="thumbnailPath" value={form.thumbnailPath} onChange={handleChange} required />
      </div>
      <div>
        <label>Authors:</label>
        {form.authors.map((author, index) => (
          <div key={index}>
            <input
              type="text"
              value={author}
              onChange={(e) => handleAuthorChange(e, index)}
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveAuthor(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddAuthor}>Add Author</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddArticle;