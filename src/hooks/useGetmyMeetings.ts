import { useQuery } from '@tanstack/react-query';
import { getMyMeetings, getMyMeetingsRequest } from '../api/meeting';

const useGetMyMeetings = (params: getMyMeetingsRequest) => {
  return useQuery({
    queryKey: ['get-my-meetings', params],
    queryFn: () => getMyMeetings(params),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useGetMyMeetings;
