import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';
import axiosInstance from '../api/axiosInstance';

const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/v1/users/me');
  return response.data;
};

const useFetchUserProfile = () => {
  return useQuery<UserProfile, AxiosError>({
    queryKey: ['userData'],
    queryFn: fetchUserProfile,
  });
};

export default useFetchUserProfile;
