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
}
