import { Post } from './Post';

export interface CreateMeetingRequest {
  address: string;
  category: string[];
  content: string;
  title: string;
  locationId: number;
  latitude: number;
  longitude: number;
  meetingDateTime: string;
  maxCount: number;
  thumbnail?: File | null;
}

export interface CreateMeetingResponse extends CreateMeetingRequest {
  id: number;
  approvedCount: number;
  meetingStatus: string;
}

export interface CreatedMeeting extends Post {
  userId: number;
  meetingId: number;
  meetingStatus: 'RECRUITING' | 'CLOSED';
  approvedCount: number;
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
  meetingStatus: 'RECRUITING' | 'CLOSED';
}

export interface getMyMeetingsRequest {
  lastId?: number;
  pageSize?: number;
}

export interface getParticipatedMeetingsRequest {
  lastId?: number;
  pageSize?: number;
}

export interface ParticipantsResponse {
  participationId: number;
  meetingId: number;
  authorId: number;
  participationStatus:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'CLOSED'
    | 'CANCELED';
  title: string;
  locationId: string;
  latitude: number;
  longitude: number;
  address: string;
  meetingDateTime: string;
  maxCount: number;
  approvedCount: number;
  category: string[];
  content: string;
  thumbnail: string;
}

export interface GetParticipatedMeetingsResponse {
  appliedMeetings: ParticipantsResponse[];
  lastId?: number;
  hasNext?: boolean;
}
