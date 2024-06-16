import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CATEGORIES_URL = '/categories';

const DeleteCategory = () => {
  const { authenticatedUser } = useAuthContext();
  const { category_id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);
  const [hasArticles, setHasArticles] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${CATEGORIES_URL}/${category_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });
        setCategoryName(response.data.name);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching category:', error);
        setIsLoading(false);
      }
    };

    const checkCategoryArticles = async () => {
      try {
        const response = await axios.get(`/articles`, {
            headers: {
              Authorization: `Bearer ${authenticatedUser.token}`,
            },
          });

          const articles = response.data;
          articles.forEach(article => {
            if (article.category._id === category_id) {
                setHasArticles(true);
            }
          });


        // setHasArticles(response.data.length > 0);
      } catch (error) {
        console.error('Error checking category articles:', error);
      }
    };

    fetchCategory();
    checkCategoryArticles();
  }, [category_id, authenticatedUser.token]);

  const handleDelete = () => {
    if (hasArticles) {
      toast.error('Cannot delete category with assigned articles.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsDeleting(true);
    const timer = setTimeout(async () => {
      try {
        await axios.delete(`${CATEGORIES_URL}/${category_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });
        toast.info('Category deleted successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/', { state: { successMessage: 'Category deleted successfully!' } });
      } catch (error) {
        console.error('Error deleting category:', error);
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
        Category deletion in progress...
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
    toast.info('Category deletion aborted!', {
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
      <h1>Delete Category</h1>
      <p>Are you sure you want to delete the category "{categoryName}"?</p>
      {hasArticles && <p style={{ color: 'red' }}>This category has assigned articles and cannot be deleted.</p>}
      <button onClick={handleDelete} disabled={isDeleting || hasArticles}>Yes</button>
      <button onClick={() => navigate('/')}>No</button>
      <ToastContainer />
    </div>
  );
};

export default DeleteCategory;
