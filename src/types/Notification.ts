type NotificationType =
  | 'NEW_PARTICIPATION_REQUEST'
  | 'PARTICIPANT_LEFT'
  | 'PARTICIPANT_APPROVED'
  | 'PARTICIPANT_REJECTED'
  | 'PARTICIPANT_KICKED'
  | 'PARTICIPANT_MEETING_CLOSED'
  | 'NEW_CHAT_MESSAGE';

export interface Notification {
  id: number;
  content: string;
  notificationType: NotificationType;
}

export type NotificationUpdate = {
  hasNotifications: boolean;
};
