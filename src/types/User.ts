export interface User {
  id: number;
  profileImage?: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  gender: string;
  birth: string;
  mbti?: string;
  introduction?: string;
  userId: string;
  status: string;
}

export type UserLoginType = 'emailUser' | 'kakaoUser' | null;
