import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteMeeting } from '../api/meeting';

interface UseDeleteMeetingProps {
  onSuccess: () => void;
}
const useDeleteMeeting = ({ onSuccess }: UseDeleteMeetingProps) => {
  return useMutation({
    mutationFn: (id: string) => deleteMeeting(id),
    onSuccess,
      onSuccess();
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
