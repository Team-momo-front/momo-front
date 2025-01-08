interface chatting {
  userId: string;
  userNickname: string;
  userProfileImageUrl: string;
  message: string;
  createdAt: string;
  updatedAt: string;
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
];
