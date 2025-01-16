import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteMeeting } from '../api/meeting';

const useDeleteMeeting = () => {
  return useMutation({
    mutationFn: (id: string) => deleteMeeting(id),
    onSuccess: () => {
      alert('모임이 취소되었습니다.');
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
