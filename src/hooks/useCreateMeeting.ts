import { useMutation } from '@tanstack/react-query';
import { createMeeting } from '../api/meeting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useCreateMeeting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createMeeting,
    onSuccess: () => {
      alert('모집글이 작성되었습니다.');
      navigate('/');
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
