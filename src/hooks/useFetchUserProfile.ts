import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserProfile } from '../types/User';
import fetchUserProfile from '../api/fetchUserProfile';

interface UseFetchUserProfileOptions {
  select?: (data: UserProfile) => any; // 선택적으로 데이터를 변환하는 함수
}

const useFetchUserProfile = (options?: UseFetchUserProfileOptions) => {
  return useQuery<UserProfile, AxiosError>({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: options?.select,
    retry: false,
  });
};

export default useFetchUserProfile;
