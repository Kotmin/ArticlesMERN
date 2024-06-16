import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ADD_CATEGORY_URL = '/categories';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  abbreviation: Yup.string().required('Abbreviation is required')
});

const AddCategory = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(ADD_CATEGORY_URL, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success('Category added successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      resetForm();
      setSubmitting(false);
      navigate('/', { state: { successMessage: 'Category created successfully!' } });
    } catch (error) {
      console.error('Error adding category:', error);
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

  return (
    <div>
      <h1>Add Category</h1>
      <Formik
        initialValues={{ name: '', abbreviation: '' }}
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
              Add
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
