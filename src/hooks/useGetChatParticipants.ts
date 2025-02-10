import { useQuery } from '@tanstack/react-query';
import { getChatParticipants } from '../api/chatrooms';

const useGetChatParticipants = (roomId: number) => {
  return useQuery({
    queryKey: ['chatroom-participants'],
    queryFn: () => getChatParticipants(roomId),
  });
};

export default useGetChatParticipants;
