import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ARTICLES_URL = '/articles';
const CATEGORIES_URL = '/categories';
const CURRENT_USER_URL = '/users/profile';

const EditArticle = () => {
  const { authenticatedUser } = useAuthContext();
  const { article_id } = useParams(); 

  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(CATEGORIES_URL);
        setCategories(categoriesResponse.data);

        const currentUserResponse = await axios.get(CURRENT_USER_URL, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });

        setCurrentUser(currentUserResponse.data._id);

        const articleResponse = await axios.get(`${ARTICLES_URL}/${article_id}`, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });

        setArticle(articleResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authenticatedUser.token, article_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    title: article.title || '',
    header: article.header || '',
    subheader: article.subheader || '',
    description: article.description || '',
    category: article.category._id || '',
    articlePath: article.articlePath || '',
    thumbnailPath: article.thumbnailPath || '',
    authors: article.authors.map(author => author._id) || [currentUser],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    header: Yup.string().required('Required'),
    subheader: Yup.string(),
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    articlePath: Yup.string().required('Required'),
    thumbnailPath: Yup.string().required('Required'),
    authors: Yup.array().of(Yup.string().required('Required')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`${ARTICLES_URL}/${article_id}`, values, {
        headers: {
          Authorization: `Bearer ${authenticatedUser.token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Article updated successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate('/', { state: { successMessage: 'Article updated successfully!' } });
      }
    } catch (error) {
      toast.error(`Error: ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Edit Article</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <label>Title:</label>
              <Field type="text" name="title" />
              {errors.title && touched.title ? <div style={{ color: 'red' }}>{errors.title}</div> : null}
            </div>
            <div>
              <label>Header:</label>
              <Field type="text" name="header" />
              {errors.header && touched.header ? <div style={{ color: 'red' }}>{errors.header}</div> : null}
            </div>
            <div>
              <label>Subheader:</label>
              <Field type="text" name="subheader" />
              {errors.subheader && touched.subheader ? <div style={{ color: 'red' }}>{errors.subheader}</div> : null}
            </div>
            <div>
              <label>Description:</label>
              <Field as="textarea" name="description" />
              {errors.description && touched.description ? <div style={{ color: 'red' }}>{errors.description}</div> : null}
            </div>
            <div>
              <label>Category:</label>
              <Field as="select" name="category">
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </Field>
              {errors.category && touched.category ? <div style={{ color: 'red' }}>{errors.category}</div> : null}
            </div>
            <div>
              <label>Article Path:</label>
              <Field type="text" name="articlePath" />
              {errors.articlePath && touched.articlePath ? <div style={{ color: 'red' }}>{errors.articlePath}</div> : null}
            </div>
            <div>
              <label>Thumbnail Path:</label>
              <Field type="text" name="thumbnailPath" />
              {errors.thumbnailPath && touched.thumbnailPath ? <div style={{ color: 'red' }}>{errors.thumbnailPath}</div> : null}
            </div>
            <div>
              <label>Authors:</label>
              <FieldArray name="authors">
                {({ push, remove }) => (
                  <>
                    {values.authors.map((author, index) => (
                      <div key={index}>
                        <Field name={`authors[${index}]`} />
                        {index !== 0 && (
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>Add Author</button>
                  </>
                )}
              </FieldArray>
              {errors.authors && touched.authors ? <div style={{ color: 'red' }}>{errors.authors}</div> : null}
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

export default EditArticle;
