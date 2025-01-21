import { Post } from './Post';

export interface CreateMeetingRequest {
  title: string;
  locationId: number;
  latitude: number;
  longitude: number;
  address: string;
  meetingDateTime: string;
  maxCount: number;
  category: string[];
  content: string;
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
  status: 'RECRUITING' | 'CLOSED';
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
  id: number;
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
