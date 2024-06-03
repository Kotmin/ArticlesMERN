import axios from 'axios';

const API_URL = '/api/articles';

export const getArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
