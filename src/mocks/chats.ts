import { Chat } from '../types/Chat';

export const chats: Chat[] = [
  {
    roomId: 1,
    meetingId: 1,
    meetingThumbnailUrl: '/image/chat.webp',
    meetingTitle: '맛집 탐방 한식 모임',
    lastMessage: '안녕하세요',
    hostId: 'user_113',
    unreadMessagesCount: 3,
    readerId: ['user_113', 'user_511'],
  },
  {
    roomId: 2,
    meetingId: 2,
    meetingThumbnailUrl: '/image/chat.webp',
    meetingTitle: '서울 맛집 양식 모임',
    lastMessage: '하이',
    hostId: 'user_789',
    unreadMessagesCount: null,
    readerId: ['user_789', 'user_512'],
  },
  {
    roomId: 3,
    meetingId: 3,
    meetingThumbnailUrl: '/image/chat.webp',
    meetingTitle: '부산 해운대 일식 모임',
    lastMessage: 'ㅋㅋㅋㅋㅋ',
    hostId: 'user_101',
    unreadMessagesCount: 101,
    readerId: ['user_101', 'user_513'],
  },
];
