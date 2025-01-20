import { isChatModalOpenState } from './../states/recoilState';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { createChatRoom } from '../api/chatrooms';
import { useSetRecoilState } from 'recoil';

export const useCreateChatroom = () => {
  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);

  return useMutation({
    mutationFn: (meetingId: number) => createChatRoom(meetingId),
    onSuccess: () => {
      alert('채팅이 생성되었습니다.');
      setIsChatModalOpen(true);
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        console.log(error);
        alert(error.message);
      } else {
        console.log(error);
        alert('오류가 발생했습니다.');
      }
    },
  });
};
