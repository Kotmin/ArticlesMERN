import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


import { useAuthContext } from '../utils/AuthContext';

const ARTICLES_URL = '/articles';
const CATEGORIES_URL = '/categories';
const CURRENT_USER_URL = '/users/profile';

const AddArticle = () => {

const { authenticatedUser } = useAuthContext();

  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(CATEGORIES_URL);
        setCategories(categoriesResponse.data);

        // Fetch current user
        const currentUserResponse = await axios.get(CURRENT_USER_URL,
            {
                headers: {
                  Authorization: `Bearer ${authenticatedUser.token}`,
                },
            }
        );

        // console.log(json(authenticatedUser));
        setCurrentUser(currentUserResponse.data._id);

        setIsLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    title: '',
    header: '',
    subheader: '',
    description: '',
    category: '',
    articlePath: '',
    thumbnailPath: '',
    authors: [currentUser] // Initialize with the current user ID if available
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    header: Yup.string().required('Required'),
    subheader: Yup.string(),
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    articlePath: Yup.string().required('Required'),
    thumbnailPath: Yup.string().required('Required'),
    authors: Yup.array().of(Yup.string().required('Required'))
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(ARTICLES_URL, values)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error creating the article!', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1>Add Article</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <label>Title:</label>
              <Field type="text" name="title" />
            </div>
            <div>
              <label>Header:</label>
              <Field type="text" name="header" />
            </div>
            <div>
              <label>Subheader:</label>
              <Field type="text" name="subheader" />
            </div>
            <div>
              <label>Description:</label>
              <Field as="textarea" name="description" />
            </div>
            <div>
              <label>Category:</label>
              <Field as="select" name="category">
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </Field>
            </div>
            <div>
              <label>Article Path:</label>
              <Field type="text" name="articlePath" />
            </div>
            <div>
              <label>Thumbnail Path:</label>
              <Field type="text" name="thumbnailPath" />
            </div>
            <div>
              <label>Authors:</label>
              <FieldArray name="authors">
                {({ push, remove }) => (
                  <>
                    {values.authors.map((author, index) => (
                      <div key={index}>
                        <Field name={`authors[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>Add Author</button>
                  </>
                )}
              </FieldArray>
            </div>
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddArticle;
