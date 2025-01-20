import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '../types/User';
import { AxiosError } from 'axios';
import fetchUserProfile from '../api/fetchUserProfile';

const useFetchUserProfileImage = () => {
  return useQuery<UserProfile, AxiosError, string>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: data => data.profileImageUrl,
    retry: false,
  });
};

export default useFetchUserProfileImage;
