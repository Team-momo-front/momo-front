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
}

// TODO: CreateProfile에서 birthdaty -> birth로 수정
