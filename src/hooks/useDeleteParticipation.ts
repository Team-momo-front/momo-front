import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteParticipation } from '../api/paricipations';

const useDeleteParticipation = (id: number) => {
  return useMutation({
    mutationFn: () => deleteParticipation(id),
    onSuccess: () => {
      alert('신청이 취소되었습니다.');
      // window.location.reload();
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

export default useDeleteParticipation;
