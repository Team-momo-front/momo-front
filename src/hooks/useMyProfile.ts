import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '../api/uesrs';

const useMyProfile = () => {
  const accessToken = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
    select: data => {
      const profileImage = data.profileImageUrl;
      return { profileImage, allData: data };
    },
    enabled: accessToken !== null,
    retry: false,
  });
};

export default useMyProfile;
