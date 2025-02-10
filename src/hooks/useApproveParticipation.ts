import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { approveParticipation } from '../api/paricipations';
import { useNavigate } from 'react-router-dom';

export const useApproveParticipation = (roomId: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (participationId: number) =>
      approveParticipation(participationId),
    onSuccess: () => {
      alert('신청을 승인하였습니다.');
      navigate(`/view-applicant/${roomId}`, { replace: true });
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        console.log(error);
        alert(error.response?.data.message);
      } else {
        console.log(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
