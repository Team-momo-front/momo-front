import type {
  CreatedMeeting,
  CreateMeetingRequest,
  CreateMeetingResponse,
  getMyMeetingsRequest,
  MeetingStatus,
  SearchMeetingsRequest,
} from '../types/Meeting';
import { apiClient } from './apiClient';

const COMMON_URL = '/api/v1/meetings';

export const createMeeting = async (
  form: FormData
): Promise<CreateMeetingResponse> =>
  apiClient({
    url: COMMON_URL,
    method: 'post',
    data: form,
  });

export const editMeeting = async (
  id: string,
  form: CreateMeetingRequest
): Promise<CreateMeetingResponse> =>
  apiClient({ url: `${COMMON_URL}/${id}`, method: 'put', data: form });

export const deleteMeeting = async (id: string) =>
  apiClient({ url: `${COMMON_URL}/${id}`, method: 'delete' });

export const searchMeetings = async (params: SearchMeetingsRequest) =>
  apiClient({ url: COMMON_URL, method: 'get', params });

export const setMeetingStatus = async (id: string, data: MeetingStatus) =>
  apiClient({ url: `${COMMON_URL}/${id}`, method: 'patch', data });

export const getParticipants = async (id: string) =>
  apiClient({ url: `${COMMON_URL}/${id}/participants`, method: 'get' });

export const getMyMeetings = async (
  params: getMyMeetingsRequest
): Promise<CreatedMeeting[]> =>
  apiClient({ url: `${COMMON_URL}/created`, method: 'get', params });
