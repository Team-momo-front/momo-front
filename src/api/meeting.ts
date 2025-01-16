import { CreatedMeeting } from '../types/Post';
import { apiClient } from './apiClient';
export interface CreateMeetingRequest {
  title: string;
  locatinoId: number | null;
  latitude: number | null;
  longitude: number | null;
  address: string;
  meetingDateTime: string;
  maxCount: number;
  category: string[];
  content: string;
  thumbnail?: string;
}
export interface SearchMeetingsRequest {
  latitude?: number;
  longitude?: number;
  lastId?: number;
  lastDistance?: number;
  lastMeetingDateTime?: string;
  pageSize?: number;
}

export interface MeetingStatus {
  status: 'RECRUITING' | 'CLOSED';
}

export interface getMyMeetingsRequest {
  lastId?: number;
  pageSize?: number;
}

const COMMON_URL = '/api/v1/meetings';

export const createMeeting = async (form: CreateMeetingRequest) =>
  apiClient({ url: COMMON_URL, method: 'post', data: form });

export const editMeeting = async (form: CreateMeetingRequest, id: string) =>
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
