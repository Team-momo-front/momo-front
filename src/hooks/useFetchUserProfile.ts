import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';
import fetchUserProfile from '../api/fetchUserProfile';

const useFetchUserProfile = () => {
  return useQuery<UserProfile, AxiosError>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    retry: false,
  });
};

export default useFetchUserProfile;
