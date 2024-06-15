import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';





const ARTICLES_URL = '/articles';

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <input type="text" name="category" value={form.category} onChange={handleChange} required />
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
        <input type="text" name="authors" value={form.authors} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddArticle;
