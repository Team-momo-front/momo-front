import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editProfile = async (profileData: FormData) => {
    const response = await axiosInstance.put('/api/v1/users/me', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

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
