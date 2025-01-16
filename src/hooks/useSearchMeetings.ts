import { useQuery } from '@tanstack/react-query';
import { searchMeetings, SearchMeetingsRequest } from '../api/meeting';

const useSearchMeetings = (params: SearchMeetingsRequest) => {
  return useQuery({
    queryKey: ['search-meetings', params],
    queryFn: () => searchMeetings(params),
  });
};

export default useSearchMeetings;
