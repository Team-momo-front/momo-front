import axios from 'axios';

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post('/api/v1/token/reissue');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
