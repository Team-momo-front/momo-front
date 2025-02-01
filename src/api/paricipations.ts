import {
  getParticipatedMeetingsRequest,
  GetParticipatedMeetingsResponse,
} from '../types/Meeting';
import { apiClient } from './apiClient';

const COMMON_URL = '/api/v1/participations';

// 참여 신청한 모임 목록 조회
export const getParticipatedMeetings = async (
  params: getParticipatedMeetingsRequest
): Promise<GetParticipatedMeetingsResponse> => {
  return apiClient<GetParticipatedMeetingsResponse>({
    url: COMMON_URL,
    method: 'get',
    params,
  });
};

// 참여 승인
export const approveParticipation = async (participationId: number) => {
  return apiClient({
    url: `${COMMON_URL}/${{ participationId }}/approve`,
    method: 'patch',
  });
};

// 참여 거절
export const rejectParticipation = async (participationId: number) => {
  return apiClient({
    url: `${COMMON_URL}/${{ participationId }}/reject`,
    method: 'patch',
  });
};

// 모임 참여 삭제 & 취소
export const deleteParticipation = async (participationId: number) => {
  return apiClient({
    url: `${COMMON_URL}/${participationId}`,
    method: 'delete',
  });
};
