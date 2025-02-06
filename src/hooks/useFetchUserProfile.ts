import { useQuery } from '@tanstack/react-query';
import fetchUserProfile from '../api/fetchUserProfile';

const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: data => {
      const profileImage = data.profileImageUrl;
      return { profileImage, allData: data };
    },
    retry: false,
  });
};

export default useFetchUserProfile;
