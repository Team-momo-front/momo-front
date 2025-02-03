import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { getUserProfileResponse } from '../types/User';

const getUserProfile = async (userId: number) => {
  const response = await axiosInstance.get(`/api/v1/users/${userId}`);
  return response.data;
};

export function useGetUserProfile(userId: number) {
  return useQuery<getUserProfileResponse>({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });
}
