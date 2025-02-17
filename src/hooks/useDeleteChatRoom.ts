import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { deleteChatRoom } from '../api/chatrooms';

const useDeleteChatRoom = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (roomId: number) => deleteChatRoom(roomId),
    onSuccess: () => {
      alert('채팅이 삭제되었습니다.');
      queryclient.invalidateQueries({
        queryKey: ['get-chatroom-list'],
      });
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

export default useDeleteChatRoom;
