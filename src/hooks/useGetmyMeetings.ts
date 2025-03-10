import { useQuery } from '@tanstack/react-query';
import { getMyMeetings } from '../api/meeting';
import type { CreatedMeeting, getMyMeetingsRequest } from '../types/Meeting';

interface GetMyMeetingsResponse {
  createdMeetingDtos: CreatedMeeting[];
}
const useGetMyMeetings = (params: getMyMeetingsRequest) => {
  return useQuery<GetMyMeetingsResponse>({
    queryKey: ['my-meetings', params],
    queryFn: () => getMyMeetings(params),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useGetMyMeetings;
