import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/articleService';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleData = await getArticleById(id);
      setArticle(articleData);
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>Category: {article.category.name}</p>
      <p>Authors: {article.authors.map(author => author.username).join(', ')}</p>
      <p>Updated at: {new Date(article.updatedAt).toLocaleDateString()}</p>
      {}
    </div>
  );
};

export default ArticleDetailPage;
