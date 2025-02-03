import { useMutation } from '@tanstack/react-query';
import { getChatHistory } from '../../api/chatrooms';
import { AxiosError } from 'axios';

export const useGetChatHistory = () => {
  return useMutation({
    mutationFn: (roomId: number) => getChatHistory(roomId),
    onSuccess: () => {
      console.log('채팅 기록 조회 완료');
    },
    onError: error => {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          console.log(error);
          alert(error.response.data.message);
        }
      } else {
        console.log(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
