import { Method } from 'axios';
import axiosInstance from './axiosInstance';

interface RequestConfig {
  url: string;
  method?: Method | string;
  data?: any;
  params?: any;
}

export async function apiClient<T = any>(config: RequestConfig): Promise<T> {
  const { url, method = 'get', data, params } = config;
  const response = await axiosInstance({
    url,
    method,
    data,
    params,
  });
  return response.data;
}
