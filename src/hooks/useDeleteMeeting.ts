import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { deleteMeeting } from '../api/meeting';
import { useLocation, useNavigate } from 'react-router-dom';

const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: (id: string) => deleteMeeting(id),
    onSuccess: () => {
      alert('모임이 취소되었습니다.');
      if (location.pathname.startsWith('/view-applicant'))
        navigate('/mypage/my-meetings', { replace: true });
      else queryClient.invalidateQueries({ queryKey: ['get-my-meetings'] });
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
