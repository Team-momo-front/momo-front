import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { rejectParticipation } from '../api/paricipations';
import { useNavigate } from 'react-router-dom';

export const useRejectParticipation = (roomId: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (participationId: number) =>
      rejectParticipation(participationId),
    onSuccess: () => {
      alert('신청을 거절하였습니다.');
      navigate(`/view-applicant/${roomId}`, { replace: true });
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
