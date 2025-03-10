import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveChatRoom } from '../api/chatrooms';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import {
  isChatListOpenState,
  isChatModalOpenState,
  isChatRoomOpenState,
  isViewParticipantListOpenState,
} from '../states/recoilState';

export const useLeaveChatRoom = () => {
  const queryClient = useQueryClient();
  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);
  const setIsChatListOpen = useSetRecoilState(isChatListOpenState);
  const setIsChatRoomOpen = useSetRecoilState(isChatRoomOpenState);
  const setIsViewParticipantListOpen = useSetRecoilState(
    isViewParticipantListOpenState
  );

  return useMutation({
    mutationFn: (roomId: number) => leaveChatRoom(roomId),
    onSuccess: () => {
      alert('채팅방에서 퇴장하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['get-chatroom-list'] });

      setIsChatModalOpen(true);
      setIsChatListOpen(true);
      setIsChatRoomOpen(false);
      setIsViewParticipantListOpen(false);
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
