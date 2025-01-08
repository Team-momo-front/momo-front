interface Chat {
  roomId: number;
  meetingId: number;
  meetingThumbnailUrl: string;
  meetingTitle: string;
  lastMessage: string;
  hostId: string;
  unreadMessagesCount: number | null;
}

export const chats: Chat[] = [
  {
    roomId: 1,
    meetingId: 1,
    meetingThumbnailUrl: '/public/favicon.svg',
    meetingTitle: '맛집 탐방 한식 모임',
    lastMessage: '안녕하세요',
    hostId: 'user_113',
    unreadMessagesCount: 3,
  },
  {
    roomId: 2,
    meetingId: 2,
    meetingThumbnailUrl: '/public/favicon.svg',
    meetingTitle: '서울 맛집 양식 모임',
    lastMessage: '하이',
    hostId: 'user_789',
    unreadMessagesCount: null,
  },
  {
    roomId: 3,
    meetingId: 3,
    meetingThumbnailUrl: '/public/favicon.svg',
    meetingTitle: '부산 해운대 일식 모임',
    lastMessage: 'ㅋㅋㅋㅋㅋ',
    hostId: 'user_101',
    unreadMessagesCount: 101,
  },
];
