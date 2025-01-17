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

export interface UserProfile {
  birth: string;
  email: string;
  gender: string;
  introduction?: string;
  mbti?: string;
  nickname: string;
  oauthProvider: string;
  phone: string;
  profileImageUrl: string;
}
