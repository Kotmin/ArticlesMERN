import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import LoginButton from './Logout';


const GET_ARTICLES_URL = '/articles';

const Home = () => {
  const [view, setView] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const userId = "loggedUserId"; 

  useEffect(() => {
    axios.get(GET_ARTICLES_URL).then(response => {
      const articles = response.data;
      const categoriesMap = {};

      articles.forEach(article => {
        if (!categoriesMap[article.category.name]) {
          categoriesMap[article.category.name] = [];
        }
        categoriesMap[article.category.name].push(article);
      });

      setCategories(Object.entries(categoriesMap));
      setArticles(articles);
    });

    // axios.get('/api/articles?sort=-publishedAt&limit=3').then(response => {
    //   setRecentArticles(response.data);
    // });
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <header>
        <div>
          <Link to="/">ArticleCont</Link>
          <div>
            <span>Hi, User</span>
            <LoginButton />
          </div>
        </div>
      </header>
      <main>
        <div>
          <Link to="/addarticle"><button>Add</button></Link>
          <button onClick={() => handleViewChange('categories')}>Categ</button>
          <button onClick={() => handleViewChange('articles')}>Artic</button>
        </div>
        <h2>{view === 'categories' ? 'Categories' : 'Articles'}</h2>
        <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
          {view === 'categories' ? (
            <CategoryList categories={categories} userId={userId} />
          ) : (
            <ArticleList articles={articles} userId={userId} />
          )}
        </div>
        <aside>
          <h3>Recent publications</h3>
          {recentArticles.map(article => (
            <div key={article._id}>
              <p>{article.title}</p>
              <p>{article.header}</p>
              <p>{article.subheader}</p>
              <p>{article.description}</p>
              <p>Author: {article.authors.map(author => author.username).join(', ')}</p>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
};

const CategoryList = ({ categories, userId }) => {
  return (
    <div>
      {categories.map(([category, articles], index) => (
        <div key={index}>
          <h3>{index + 1}. {category}</h3>
          <ul>
            {articles.map(article => (
              <li key={article._id}>
                <Link to={`/details/${article._id}`}>{article.title}</Link>
                <Link to={`/details/${article._id}`}>{article.subheader}</Link>
                {article.authors.includes(userId) && (
                  <>
                    <Link to={`/edit/${article._id}`}><button>Edit</button></Link>
                    <button>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ArticleList = ({ articles, userId }) => {
  return (
    <ul>
      {articles.map(article => (
        <li key={article._id}>
          <Link to={`/details/${article._id}`}>{article.title}</Link>
          <Link to={`/details/${article._id}`}>{article.subheader}</Link>
          {article.authors.includes(userId) && (
            <>
              <Link to={`/edit/${article._id}`}><button>Edit</button></Link>
              <button>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Home;
