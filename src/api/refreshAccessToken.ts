import axiosInstance from './axiosInstance';

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post('/api/v1/token/reissue');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
