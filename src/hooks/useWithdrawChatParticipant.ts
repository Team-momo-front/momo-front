import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { withdrawChatParticipant } from '../api/chatrooms';

export function useWithdrawChatParticipant(roomId: number, userId: number) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => withdrawChatParticipant(roomId, userId),
    onSuccess: () => {
      alert('해당 회원을 모임에서 내보냈습니다.');
      navigate(-1);
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
}
