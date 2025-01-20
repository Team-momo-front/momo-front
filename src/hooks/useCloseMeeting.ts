import { useMutation } from '@tanstack/react-query';
import { setMeetingStatus } from '../api/meeting';
import axios from 'axios';

export function useCloseMeeting() {
  return useMutation({
    mutationFn: async (id: string) => {
      await setMeetingStatus(id, { status: 'CLOSED' });
    },
    onSuccess: () => {
      alert('모집완료 되었습니다.');
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
