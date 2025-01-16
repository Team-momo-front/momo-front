import axios from 'axios';

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
  error => {
    // TODO : 401, 403 등의 에러 처리
    // if (error.response && error.response.status === 401) {
    // }
    if (error.response && error.response.data.code === 'PROFILE_REQUIRED') {
      // 프로필 검증 오류시 로컬스토리지 'hasProfile'에 'false'값 저장
      localStorage.setItem('hasProfile', 'false');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
