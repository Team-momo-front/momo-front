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
    select: data => {
      const meetingIds = data.appliedMeetings.map(meeting => meeting.meetingId);
      return { meetingIds, allData: data };
    },
  });
};

export default useGetMyParticipatedMeetings;
