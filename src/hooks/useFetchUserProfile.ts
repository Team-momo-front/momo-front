import { useQuery } from '@tanstack/react-query';
import fetchUserProfile from '../api/fetchUserProfile';

const useFetchUserProfile = () => {
  const accessToken = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['UserProfile'],
    queryFn: fetchUserProfile,
    select: data => {
      const profileImage = data.profileImageUrl;
      return { profileImage, allData: data };
    },
    enabled: accessToken !== null,
  });
};

export default useFetchUserProfile;
