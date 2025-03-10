export interface Post {
  address: string;
  approvedCount: number;
  authorId: number;
  category: string[];
  content: string;
  distance: number | null;
  id: number;
  latitude: number;
  locationId: number;
  longitude: number;
  maxCount: number;
  meetingDateTime: string;
  meetingStatus: HostStatus;
  thumbnail?: string;
  title: string;
  // mockData 테스트용
  participatedUserId?: string[];
  participationStatus?: ParticipantStatus;
  hostedUserId?: string; // authorId와 동일
}

export type PlaceDetail = {
  id: string;
  place_name: string;
  address_name: string;
  phone?: string;
  x: string;
  y: string;
  place_url: string;
};

export type Place = Pick<
  PlaceDetail,
  'id' | 'place_name' | 'address_name' | 'x' | 'y'
>;

export type HostStatus = 'RECRUITING' | 'CLOSED';

export type ParticipantStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CLOSED'
  | 'CANCELED';

export type RenderingStatus =
  | '모집 완료'
  | '모집 중..'
  | '승인 대기'
  | '승인 완료'
  | '승인 거부'
  | '모집 취소';

export type ActiveState = 'isHosted' | 'isParticipated';
