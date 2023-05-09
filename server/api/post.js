import axios from 'axios';

export const fetchPostsAPI = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

export const postPostAPI = async (post) => {
  const response = await axios.post('/api/posts', post);
  return response.data;
};