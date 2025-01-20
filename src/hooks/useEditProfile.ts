import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedUserProfile } from '../types/User';
import axiosInstance from '../api/axiosInstance';

const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editProfile = async (profileData: UpdatedUserProfile) => {
    const response = await axiosInstance.put('/api/v1/users/me', {
      // TODO: profileImage를 stinrg Type이 아닌 FormData 형식으로 변경
      // api 수정 후 요청값에 맞게 수정 필요
      ...profileData,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: editProfile,
    onSuccess: updatedData =>
      queryClient.setQueryData<UpdatedUserProfile>(
        ['UserProfile'],
        updatedData
      ),
  });
};

export default useEditProfile;
