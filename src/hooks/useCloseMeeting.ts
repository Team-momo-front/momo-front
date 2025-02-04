import { useMutation } from '@tanstack/react-query';
import { setMeetingStatus } from '../api/meeting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useCloseMeeting() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      await setMeetingStatus(id, { meetingStatus: 'CLOSED' });
    },
    onSuccess: () => {
      alert('모집완료 되었습니다.');
      navigate('/mypage/my-meetings', { replace: true });
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
