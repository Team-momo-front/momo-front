interface chatting {
  userId: string;
  userNickname: string;
  userProfileImageUrl: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface chattingParticipantList {
  id: string;
  nickname: string;
  profileImageUrl: string;
}

export const chat1: chatting[] = [
  {
    userId: 'user_113',
    userNickname: '한식러버',
    userProfileImageUrl: 'https://picsum.photos/400/600',
    message: '안녕하세요',
    createdAt: '2025-01-09T04:40:02.140812',
    updatedAt: '2025-01-09T04:40:02.140812',
  },
  {
    userId: 'user_511',
    userNickname: '호랑이',
    userProfileImageUrl: 'https://picsum.photos/200/300',
    message: '안녕하세요~',
    createdAt: '2025-01-09T04:40:25.073831',
    updatedAt: '2025-01-09T04:40:25.073831',
  },
  {
    userId: 'user_511',
    userNickname: '호랑이',
    userProfileImageUrl: 'https://picsum.photos/200/300',
    message: '반갑습니다. 호랑이입니다.',
    createdAt: '2025-01-09T04:40:40.073831',
    updatedAt: '2025-01-09T04:40:40.073831',
  },
  {
    userId: 'user_113',
    userNickname: '한식러버',
    userProfileImageUrl: 'https://picsum.photos/400/600',
    message: '안녕하세요. 한식러버입니다.',
    createdAt: '2025-01-09T04:41:02.140812',
    updatedAt: '2025-01-09T04:41:02.140812',
  },
  {
    userId: 'user_511',
    userNickname: '호랑이',
    userProfileImageUrl: 'https://picsum.photos/200/300',
    message: '메뉴 정해졌나요?',
    createdAt: '2025-01-09T04:41:40.073831',
    updatedAt: '2025-01-09T04:41:40.073831',
  },
  {
    userId: 'user_113',
    userNickname: '한식러버',
    userProfileImageUrl: 'https://picsum.photos/400/600',
    message: '일단 한식 먹으러 갈건데요.',
    createdAt: '2025-01-09T04:42:02.140812',
    updatedAt: '2025-01-09T04:42:02.140812',
  },
  {
    userId: 'user_113',
    userNickname: '한식러버',
    userProfileImageUrl: 'https://picsum.photos/400/600',
    message: '사람이 더 모이면 함께 정해보죠',
    createdAt: '2025-01-09T04:42:11.140812',
    updatedAt: '2025-01-09T04:42:11.140812',
  },
];

export const chat1ParticipantList: chattingParticipantList[] = [
  {
    id: 'user_113',
    nickname: '한식러버',
    profileImageUrl: 'https://picsum.photos/400/600',
  },
  {
    id: 'user_511',
    nickname: '호랑이',
    profileImageUrl: 'https://picsum.photos/200/300',
  },
];
