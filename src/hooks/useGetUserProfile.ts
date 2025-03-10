import { useQuery } from '@tanstack/react-query';
import { GetUserProfileResponse } from '../types/User';
import { getUserProfile } from '../api/uesrs';

export function useGetUserProfile(userId: number) {
  return useQuery<GetUserProfileResponse>({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });
}
