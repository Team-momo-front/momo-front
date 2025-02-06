import { useQuery } from '@tanstack/react-query';
import { getChatRoomList } from '../api/chatrooms';

const useGetChatRoomList = () => {
  return useQuery({
    queryKey: ['get-chatroom-list'],
    queryFn: getChatRoomList,
    retry: false,
  });
};

export default useGetChatRoomList;
