import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { deleteMeeting } from '../api/meeting';
import { useLocation } from 'react-router-dom';

interface UseDeleteMeetingProps {
  onSuccess: () => void;
}
const useDeleteMeeting = ({ onSuccess }: UseDeleteMeetingProps) => {
  const locate = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMeeting(id),
    onSuccess: () => {
      onSuccess();

      // 페이지 단위로 모임 리스트 업데이트
      if (locate.pathname === '/') {
        queryClient.invalidateQueries({ queryKey: ['search-meetings'] });
      }
      if (locate.pathname === '/mypage/my-meetings') {
        queryClient.invalidateQueries({ queryKey: ['my-meetings'] });
      }
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

export default useDeleteMeeting;
