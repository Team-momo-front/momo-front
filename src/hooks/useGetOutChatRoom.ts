import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getOutChatRoom } from '../api/chatrooms';

export const useGetOutChatRoom = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (roomId: number) => getOutChatRoom(roomId),
    onSuccess: () => {
      console.log('채팅방 나가기(뒤로가기)');
      queryclient.invalidateQueries({ queryKey: ['get-chatroom-list'] });
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        console.log(error);
        alert(error.message);
      } else {
        console.log(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
