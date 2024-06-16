import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CATEGORIES_URL = '/categories';

const CategoryControlList = () => {
  const { authenticatedUser } = useAuthContext();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_URL, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [authenticatedUser.token]);

  const handleDelete = async (category_id) => {
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
      setCategories(categories.filter(category => category._id !== category_id));
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
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Manage Categories</h2>
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>
                <Link to={`/edit_category/${category._id}`}>{category.name}</Link>
              </td>
              <td>
                <Link to={`/delete_category/${category._id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add_category"><button>Add Category</button></Link>
      <ToastContainer />
    </div>
  );
};

export default CategoryControlList;
