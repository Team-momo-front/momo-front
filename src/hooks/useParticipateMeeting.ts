import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { participateMeeting } from '../api/paricipations';

const useParticipateMeeting = (meetingId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: participateMeeting,
    onSuccess: () => {
      alert('신청이 완료되었습니다.');
      navigate(`/post/${meetingId}`);
    },
  });
};

export default useParticipateMeeting;
