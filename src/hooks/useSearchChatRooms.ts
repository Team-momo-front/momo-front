import { useQuery } from '@tanstack/react-query';
import { searchChatRooms } from '../api/chatrooms';

const useSearchChatRooms = () => {
  return useQuery({
    queryKey: ['search-chatrooms'],
    queryFn: searchChatRooms,
    retry: false,
  });
};

export default useSearchChatRooms;
