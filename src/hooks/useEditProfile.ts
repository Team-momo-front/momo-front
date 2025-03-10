import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfile } from '../api/uesrs';

const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
      alert('프로필이 수정되었습니다.');
    },
    onError: error => {
      console.log(error);
      alert('프로필 수정에 실패하였습니다.');
    },
  });
};

export default useEditProfile;
