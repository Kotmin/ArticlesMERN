import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../services/articleService';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesData = await getArticles();
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(id);
      setArticles(articles.filter(article => article._id !== id));
    }
  };

  return (
    <div>
      <h1>Articles</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Authors</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article._id}>
              <td><Link to={`/articles/${article._id}`}>{article.title}</Link></td>
              <td>{article.category.name}</td>
              <td>{article.authors.map(author => author.username).join(', ')}</td>
              <td>{new Date(article.updatedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(article._id)}>Delete</button>
                <Link to={`/articles/edit/${article._id}`}><button>Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesPage;
