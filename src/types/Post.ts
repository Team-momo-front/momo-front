export interface Post {
  id: string;
  title: string;
  meetingDate: string;
  location: string;
  participationCount: number;
  approvedCount: number;
  categories: string[];
  content: string;
  thumbnail?: string;
  place_name: string;
  lat: number;
  lng: number;
  hostedUserId?: string;
  participatedUserId?: string[];
  status: HostStatus;
  participationStatus: ParticipantStatus;
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
  'place_name' | 'address_name' | 'x' | 'y'
>;

export type HostStatus = '모집 중..' | '모집 완료';
export type ParticipantStatus =
  | '승인 대기'
  | '승인 완료'
  | '승인 거부'
  | '모집 완료'
  | '모집 취소';

export type ActiveState = 'isHosted' | 'isParticipated';
