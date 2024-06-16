import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import LoginButton from './Logout';

import { useAuthContext } from "../utils/AuthContext";
import { useNavigate } from 'react-router-dom';


import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GET_ARTICLES_URL = '/articles';

const Home = () => {


  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location.state]);

  const [view, setView] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const userId = ""; 

  const { authenticatedUser, setAuthToken, loading } = useAuthContext();

  // console.log(authenticatedUser.user.username);
  


  let config = {};
  if(authenticatedUser.user) {
    const aT = localStorage.getItem("accessToken"); 
     config = {
      headers: { Authorization: `Bearer ${aT}` }
    };
  }
  useEffect(() => {

    axios.get(GET_ARTICLES_URL, config).then(response => {
      const articles = response.data;

      const draftArticles = articles.filter(article => article.status === 'draft');
      console.log(draftArticles)

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
  }, [loading]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <header>
        <div>
          <Link to="/">ArticleCont</Link>
          <div>
            <span>{ authenticatedUser.user ? `Hi, ${authenticatedUser.user.username}`:""}</span>
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
            <CategoryList categories={categories} userId={authenticatedUser.user?._id} />
          ) : (
            <ArticleList articles={articles} userId={authenticatedUser.user?._id} />
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
      <ToastContainer />
    </div>
  );
};

const CategoryList = ({ categories, userId }) => {

  // var author_names = article.authors.map(function (item){
  //   return item["username"]
  // })

  return (
    <div>
      {categories.map(([category, articles], index) => (
        
        <div key={index}>
          <h3>{index + 1}. {category}</h3>
          <ul>
            {articles.map(article => (
              <li key={article._id}>
                <Link to={`/a/${article._id}`}>{article.title}</Link>
                <Link to={`/a/${article._id}`}>{article.subheader}</Link>
                <Link to={`/a/${article._id}`}> {article.description}</Link>
                <Link to={`/a/${article._id}`}> {article.authors.map(function (item){
                                      return item["username"]
                                    }).toString()}</Link>
                
                {/* <Link to={`/details/${article._id}`}>{article.subheader}</Link> */}
                {article.authors.map(function(item){ return item["_id"]}).includes(userId) && (
                  <>
                    <Link to={`/edit_article/${article._id}`}><button>Edit</button></Link>
                    <Link to={`/delete_article/${article._id}`}><button>Delete</button></Link>
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
  console.log(`uid:${userId}`);
  return (
    <ul>
      {articles.map(article => (
        <li key={article._id}>
          <Link to={`/details/${article._id}`}>{article.title}</Link>
          <Link to={`/details/${article._id}`}>{article.subheader}</Link>

          <Link to={`/details/${article._id}`}>{article.authors}</Link>

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
