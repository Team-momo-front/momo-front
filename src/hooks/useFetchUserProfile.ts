import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';
import fetchUserProfile from '../api/fetchUserProfile';

interface UseFetchUserProfileOptions {
  select?: (data: UserProfile) => string;
}

const useFetchUserProfile = (options?: UseFetchUserProfileOptions) => {
  return useQuery<UserProfile, AxiosError, string>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: options?.select,
    retry: false,
  });
};

export default useFetchUserProfile;
