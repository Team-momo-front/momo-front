import { UserProfile } from '../types/User';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import axiosInstance from './axiosInstance';

const getMyProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/v1/users/me');

  const processedData: UserProfile = {
    ...response.data,
    mbti: response.data.mbti === 'NONE' ? '' : response.data.mbti,
    profileImageUrl: response.data.profileImageUrl || null,
    phone: formatPhoneNumber(response.data.phone),
  };

  return processedData;
};

export default getMyProfile;
