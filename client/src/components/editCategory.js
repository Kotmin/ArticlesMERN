import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GET_CATEGORY_URL = '/categories';
const EDIT_CATEGORY_URL = '/categories';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  abbreviation: Yup.string().required('Abbreviation is required')
});

const EditCategory = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${GET_CATEGORY_URL}/${category_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, [category_id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${EDIT_CATEGORY_URL}/${category_id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success('Category updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSubmitting(false);
      navigate('/', { state: { successMessage: 'Category updated successfully!' } });
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`Error: ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSubmitting(false);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Category</h1>
      <Formik
        initialValues={{ name: category.name, abbreviation: category.abbreviation }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="abbreviation">Abbreviation</label>
              <Field name="abbreviation" type="text" />
              <ErrorMessage name="abbreviation" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditCategory;
