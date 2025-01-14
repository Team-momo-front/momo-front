import { Notification } from '../types/Notification';

export const notifications: Notification[] = [
  {
    id: 1,
    content: 'A님이 Title1 모임에 참여를 요청했습니다.',
    notificationType: 'NEW_PARTICIPATION_REQUEST',
  },
  {
    id: 2,
    content: 'B님이 Title2 모임에서 나갔습니다.',
    notificationType: 'PARTICIPANT_LEFT',
  },
  {
    id: 3,
    content: 'Title3 모임참여가 승인되었습니다.',
    notificationType: 'PARTICIPANT_APPROVED',
  },
];
