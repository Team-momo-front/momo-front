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

export interface CreatedMeeting extends CreateMeetingRequest {
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
