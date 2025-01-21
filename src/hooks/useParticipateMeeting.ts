import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axiosInstance from '../api/axiosInstance';

const useParticipateMeeting = (meetingId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/api/v1/participations/${meetingId}`
      );
      return response;
    },
    onSuccess: () => {
      alert('신청이 완료되었습니다.');
      navigate(`/post/${meetingId}`);
    },
    onError: error => {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          console.log(error);
          alert(error.response.data.message);
        }
      } else {
        console.log(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};

export default useParticipateMeeting;
