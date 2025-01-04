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
