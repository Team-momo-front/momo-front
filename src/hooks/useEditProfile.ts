import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedUserProfile } from '../types/User';
import axiosInstance from '../api/axiosInstance';

const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editProfile = async (profileData: UpdatedUserProfile) => {
    const response = await axiosInstance.put('/api/v1/users/me', {
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
