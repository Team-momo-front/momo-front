import { JoinUserRequest } from './../types/User';
import { UserProfile } from '../types/User';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { apiClient } from './apiClient';

const COMMON_URL = '/api/v1/users';

// 회원가입
export const joinUser = async (form: JoinUserRequest) =>
  apiClient({
    url: `${COMMON_URL}/signup`,
    method: 'post',
    data: {
      ...form,
      phone: form.phoneNumber.replace(/[^0-9]/g, ''),
    },
  });

// 이메일 인증
export const confirmEmailCode = async (code: string) => {
  apiClient({
    url: `${COMMON_URL}/signup/verify`,
    method: 'post',
    params: {
      code: code,
    },
  });
};

// 프로필 조회
export const getMyProfile = async (): Promise<UserProfile> => {
  const data = await apiClient<UserProfile>({
    url: `${COMMON_URL}/me`,
    method: 'get',
  });

  return {
    ...data,
    mbti: data.mbti === 'NONE' ? '' : data.mbti,
    profileImageUrl: data.profileImageUrl,
    phone: formatPhoneNumber(data.phone ?? ''),
  };
};
