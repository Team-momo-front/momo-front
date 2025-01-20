export interface Chat {
  roomId: number;
  meetingId: number;
  meetingThumbnail: string;
  meetingTitle: string;
  lastMessage: string;
  hostId: string;
  unreadMessagesCount: number | null;
  readerId: string[];
}

export interface ChatRoomResponse {
  roomId: number;
  meetingId: number;
  meetingThumbnail: string;
  meetingTitle: string;
  lastMessage: string;
  hostId: number;
  readerId: number[];
  unreadMessagesCount: number | null;
}

export interface ChatHistoryResponse {
  userId: number;
  userNickname: string;
  userProfileImageUrl: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParticipant {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}
