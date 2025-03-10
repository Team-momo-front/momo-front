import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { deleteParticipation } from '../api/paricipations';

const useDeleteParticipation = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteParticipation(id),
    onSuccess: () => {
      alert('신청이 취소되었습니다.');
      queryclient.invalidateQueries({
        queryKey: ['get-participated-meetings'],
      });
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
