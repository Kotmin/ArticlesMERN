import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ARTICLES_URL = '/articles';

const ArticleDetail = () => {
  const { article_id } = useParams();
  const { authenticatedUser } = useAuthContext();


  let config = {};
  if (authenticatedUser.user) {
    const aT = localStorage.getItem("accessToken");
    config = {
      headers: { Authorization: `Bearer ${aT}` }
    };
  }


  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authorArticles, setAuthorArticles] = useState({});
  const [errorLoadingAuthorArticles, setErrorLoadingAuthorArticles] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${ARTICLES_URL}/${article_id}`,config);
        setArticle(response.data);

        // Fetch additional data for each author
        const articlesData = await Promise.all(response.data.authors.map(async (author) => {
          try {
            const articleDetails = await Promise.all(author.articles.slice(0, 5).map(async (articleId) => {
              const res = await axios.get(`${ARTICLES_URL}/${articleId}`,config);
              if (res.data.length === 0) navigate('/missing');
              return res.data;
            }));
            return { authorId: author._id, articles: articleDetails };
          } catch (error) {
            console.error(`Error fetching articles for author ${author._id}:`, error);
            // navigate('/missing');
            return { authorId: author._id, articles: [] };
          }
        }));

        const articlesMap = {};
        articlesData.forEach(({ authorId, articles }) => {
          articlesMap[authorId] = articles;
        });

        setAuthorArticles(articlesMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setIsLoading(false);
        navigate('/missing');
      }
    };

    fetchArticle();
  }, [article_id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${ARTICLES_URL}/${article_id}`, {
        headers: {
          Authorization: `Bearer ${authenticatedUser.token}`,
        },
      });
      toast.info('Article deleted successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/', { state: { successMessage: 'Article deleted successfully!' } });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error(`Error: ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
      <Link to="/">Home</Link>
      </p>
      <h1>{article.title}</h1>
      {article.thumbnailPath && (
        <img
          src={article.thumbnailPath}
          alt="thumbnail"
          style={{ maxWidth: '100%', maxHeight: '400px' }}
        />
      )}
      <h2>{article.header}</h2>
      <h3>{article.subheader}</h3>
      <div>
        <span>{article.category.name}</span>
        <span style={{ marginLeft: '10px' }}>
          <i className="fa fa-clock-o" /> {format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm')}
        </span>
      </div>
      <p>{article.description}</p>
      <h3>Authors</h3>
      {article.authors.map(author => (
        <div key={author._id}>
          <p>{author.username}</p>

          {author.articles.length >0 ? 
          (
          <ul>
          {author.articles.slice(0, author.articles.length).map(a => (
              <li key={a._id}>
                <Link to={`/a/${a._id}`}>{a.title}</Link>
              </li>
            ))}
        </ul>

          ): (
            <p>{errorLoadingAuthorArticles ? 'Error loading articles' : 'No accessible articles'}</p>
          )}

        </div>
      ))}
      {authenticatedUser.user && article.authors.map(a => a._id).includes(authenticatedUser.user._id) && (
        <div>
          <Link to={`/edit_article/${article._id}`}><button>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ArticleDetail;

