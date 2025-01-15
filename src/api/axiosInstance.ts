import axios from 'axios';

const BASE_URL = 'http://54.180.112.35:8080';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
