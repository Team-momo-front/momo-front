import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';
import axiosInstance from '../api/axiosInstance';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/v1/users/me');

  const userId = localStorage.getItem('userId');

  const processedData: UserProfile = {
    ...response.data,
    mbti: response.data.mbti === 'NONE' ? '' : response.data.mbti,
    profileImageUrl: response.data.profileImageUrl || null,
    phone: formatPhoneNumber(response.data.phone),
    nickname:
      response.data.nickname === '' ? `anony${userId}` : response.data.nickname,
  };

  return processedData;
};

const useFetchUserProfile = () => {
  return useQuery<UserProfile, AxiosError>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    retry: false,
  });
};

export default useFetchUserProfile;
