import type {
  CreateMeetingResponse,
  getMyMeetingsRequest,
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
  form: FormData
): Promise<CreateMeetingResponse> =>
  apiClient({ url: `${COMMON_URL}/${id}`, method: 'put', data: form });

export const deleteMeeting = async (id: string) =>
  apiClient({ url: `${COMMON_URL}/${id}`, method: 'delete' });

export const searchMeetings = async (params: SearchMeetingsRequest) =>
  apiClient({ url: COMMON_URL, method: 'get', params });

export const completeMeeting = async (id: string) =>
  apiClient({ url: `${COMMON_URL}/${id}/complete`, method: 'patch' });

export const getParticipants = async (id: number) =>
  apiClient({ url: `${COMMON_URL}/${id}/participants`, method: 'get' });

export const getMyMeetings = async (params: getMyMeetingsRequest) =>
  apiClient({ url: `${COMMON_URL}/created`, method: 'get', params });
