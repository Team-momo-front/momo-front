import axiosInstance from './axiosInstance';

export interface CreatePostRequest {
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

export const createMeetings = async (form: CreatePostRequest) => {
  await axiosInstance.post('/api/v1/meetings', form);
};
