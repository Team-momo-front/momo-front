import { useQuery } from '@tanstack/react-query';
import { searchMeetings } from '../api/meeting';
import { SearchMeetingsRequest } from '../types/Meeting';

const useSearchMeetings = (params: SearchMeetingsRequest) => {
  return useQuery({
    queryKey: ['search-meetings', params],
    queryFn: () => searchMeetings(params),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useSearchMeetings;
