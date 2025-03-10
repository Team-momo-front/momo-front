import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    // TODO : 공통적으로 처리할 일이 있으면 여기서 처리
    return response;
  },
  async error => {
    // TODO : 401, 403 등의 에러 처리
    // if (error.response && error.response.status === 401) {
    // }

    if (error.response && error.response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        console.log('액세스 토큰 갱신 성공, new 액세스 토큰:', newToken);
        return axiosInstance(error.config);
      }
      console.log('엑세스 토큰 갱신 실패, 로그아웃 됩니다.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginType');
      localStorage.removeItem('userId');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
