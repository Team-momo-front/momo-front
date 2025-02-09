import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import type { UpdatedUserProfile } from '../types/User';

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
    onSuccess: updatedData =>
      queryClient.setQueryData<UpdatedUserProfile>(['my-profile'], updatedData),
    retry: false,
  });
};

export default useEditProfile;
