import { useQuery } from '@tanstack/react-query';
import fetchUserProfile from '../api/fetchUserProfile';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';

interface UseFetchUserProfileOptions {
  select?: (data: UserProfile) => string;
}

export const useFetchUSerProfileImage = (
  options?: UseFetchUserProfileOptions
) => {
  return useQuery<UserProfile, AxiosError, string>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: options?.select,
    retry: false,
  });
};
