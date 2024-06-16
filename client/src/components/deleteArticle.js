// DeleteArticle.js

import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ARTICLES_URL = '/articles';

const DeleteArticle = () => {
  const { authenticatedUser } = useAuthContext();
  const { article_id } = useParams();
  const navigate = useNavigate();

  const [articleTitle, setArticleTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${ARTICLES_URL}/${article_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });
        setArticleTitle(response.data.title);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [article_id, authenticatedUser.token]);

  const handleDelete = () => {
    setIsDeleting(true);
    const timer = setTimeout(async () => {
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
      setIsDeleting(false);
    }, 5000);

    setDeleteTimer(timer);

    toast.info(
      <div>
        Article deletion in progress...
        <button onClick={abortDelete} style={{ marginLeft: '10px', backgroundColor: 'orange', border: 'none', padding: '5px' }}>
          Abort
        </button>
      </div>,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const abortDelete = () => {
    clearTimeout(deleteTimer);
    setIsDeleting(false);
    toast.info('Article deletion aborted!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delete Article</h1>
      <p>Are you sure you want to delete the article "{articleTitle}"?</p>
      <button onClick={handleDelete} disabled={isDeleting}>Yes</button>
      <button onClick={() => navigate('/')}>No</button>
      <ToastContainer />
    </div>
  );
};

export default DeleteArticle;
