export interface Chat {
  roomId: number;
  meetingId: number;
  meetingThumbnailUrl: string;
  meetingTitle: string;
  lastMessage: string;
  hostId: string;
  unreadMessagesCount: number | null;
}
