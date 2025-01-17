import { useQuery } from '@tanstack/react-query';
import { getMyMeetings } from '../api/meeting';
import type { getMyMeetingsRequest } from '../types/Meeting';

const useGetMyMeetings = (params: getMyMeetingsRequest) => {
  return useQuery({
    queryKey: ['get-my-meetings', params],
    queryFn: () => getMyMeetings(params),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useGetMyMeetings;
