import { useQuery } from '@tanstack/react-query';
import { getParticipatedMeetings } from '../api/paricipations';
import { getParticipatedMeetingsRequest } from '../types/Meeting';

const useGetMyParticipatedMeetings = (
  params: getParticipatedMeetingsRequest
) => {
  return useQuery({
    queryKey: ['get-participated-meetings', params],
    queryFn: () => getParticipatedMeetings(params),
    retry: false,
  });
};

export default useGetMyParticipatedMeetings;
