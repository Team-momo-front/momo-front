import { HostStatus, ParticipantStatus, ActiveState } from '../types/Post';

type StatusWithColor = {
  status: HostStatus | ParticipantStatus;
  color: string;
};

export const getStatusAndColorByRole = (
  status: HostStatus | ParticipantStatus,
  isActiveState: ActiveState
): StatusWithColor => {
  if (isActiveState === 'isHosted') {
    if (status === '모집 완료') {
      return { status: '모집 완료', color: 'bg-primary' };
    } else {
      return { status: '모집 중..', color: 'bg-gray-400' };
    }
  }

  if (isActiveState === 'isParticipated') {
    switch (status) {
      case '승인 대기':
        return { status: '승인 대기', color: 'bg-gray-400' };
      case '승인 완료':
        return { status: '승인 완료', color: 'bg-primary' };
      case '승인 거부':
        return { status: '승인 거부', color: 'bg-error' };
      case '모집 완료':
        return { status: '모집 완료', color: 'bg-error' };
      case '모집 취소':
        return { status: '모집 취소', color: 'bg-error' };
      default:
        throw new Error(`알 수 없는 상태: ${status}`);
    }
  }

  throw new Error('유효하지 않은 상태 또는 역할입니다.');
};
