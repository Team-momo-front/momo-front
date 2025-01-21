import {
  HostStatus,
  ParticipantStatus,
  ActiveState,
  RenderingStatus,
} from '../types/Post';

type StatusWithColor = {
  status: RenderingStatus;
  color: string;
};

export const getStatusAndColorByRole = (
  status: HostStatus | ParticipantStatus,
  isActiveState: ActiveState
): StatusWithColor => {
  if (isActiveState === 'isHosted') {
    if (status === 'CLOSED') {
      return { status: '모집 완료', color: 'bg-primary' };
    }
    return { status: '모집 중..', color: 'bg-gray-400' };
  }

  if (isActiveState === 'isParticipated') {
    switch (status) {
      case 'PENDING':
        return { status: '승인 대기', color: 'bg-gray-400' };
      case 'APPROVED':
        return { status: '승인 완료', color: 'bg-primary' };
      case 'REJECTED':
        return { status: '승인 거부', color: 'bg-error' };
      case 'CLOSED':
        return { status: '모집 완료', color: 'bg-error' };
      case 'CANCELED':
        return { status: '모집 취소', color: 'bg-error' };
      default:
        throw new Error(`알 수 없는 상태: ${status}`);
    }
  }

  throw new Error('유효하지 않은 상태 또는 역할입니다.');
};
