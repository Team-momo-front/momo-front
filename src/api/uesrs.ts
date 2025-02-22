import {
  changePasswordRequest,
  EmailLoginRequest,
  EmailLoginResponse,
  GetUserProfileResponse,
  JoinUserRequest,
} from './../types/User';
import { MyProfile } from '../types/User';
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
  return apiClient({
    url: `${COMMON_URL}/signup/verify`,
    method: 'post',
    params: {
      code: code,
    },
  });
};

// 로그인
export const emailLogin = async (
  form: EmailLoginRequest
): Promise<EmailLoginResponse> => {
  return apiClient<EmailLoginResponse>({
    url: `${COMMON_URL}/login`,
    method: 'post',
    data: form,
  });
};

// 로그아웃
export const logout = async () =>
  apiClient({
    url: `${COMMON_URL}/logout`,
    method: 'delete',
  });

// 회원탈퇴
export const deleteAccount = async () =>
  apiClient({
    url: `${COMMON_URL}`,
    method: 'delete',
  });

// 이메일로 재설정 링크 발송
export const sendLinkToEmail = async (email: string) => {
  return apiClient({
    url: `${COMMON_URL}/password/change/link-send`,
    method: 'post',
    data: {
      email: email,
    },
  });
};

// 비밀번호 변경
export const changePassword = async (
  form: changePasswordRequest
): Promise<changePasswordRequest> => {
  return apiClient<changePasswordRequest>({
    url: `${COMMON_URL}/password/change`,
    method: 'post',
    data: form,
  });
};

// 본인 프로필 조회
export const getMyProfile = async (): Promise<MyProfile> => {
  const data = await apiClient<MyProfile>({
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

// 타인 프로필 조회
export const getUserProfile = async (
  userId: number
): Promise<GetUserProfileResponse> => {
  return await apiClient<GetUserProfileResponse>({
    url: `${COMMON_URL}/${userId}`,
    method: 'get',
  });
};

// 프로필 수정
export const editProfile = async (profileData: FormData) =>
  apiClient({
    url: `${COMMON_URL}/me`,
    method: 'put',
    data: profileData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
