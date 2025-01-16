import { CreatedMeeting, Post } from '../types/Post';

const convertMeetingsToPosts = (meetings: CreatedMeeting[]): Post[] => {
  return meetings.map(meeting => {
    return {
      id: meeting.meetingId.toString(),
      title: meeting.title,
      meetingDate: meeting.meetingDateTime,
      location: meeting.address,
      participationCount: meeting.maxCount,
      approvedCount: meeting.approvedCount,
      categories: meeting.category,
      content: meeting.content,
      thumbnail: meeting.thumbnailUrl || undefined,
      place_name: meeting.address,
      lat: meeting.latitude,
      lng: meeting.longitude,
      hostedUserId: meeting.userId.toString(),
      status:
        meeting.meetingStatus === 'RECRUITING' ? '모집 중..' : '모집 완료',
    };
  });
};

export default convertMeetingsToPosts;
