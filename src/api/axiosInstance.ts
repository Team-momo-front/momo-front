import axios from 'axios';

const BASE_URL = 'http://54.180.112.35:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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
  error => {
    // TODO : 401, 403 등의 에러 처리
    // if (error.response && error.response.status === 401) {
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
