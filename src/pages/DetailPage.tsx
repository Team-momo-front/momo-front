import { useParams } from 'react-router-dom';
import { meetings } from '../mocks/meetings';
import ApplyMeetingPage from './ApplyMeetingPage';
import PostEditPage from './PostEditPage';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return;
  const meeting = meetings.find(meeting => meeting.id === Number(id));

  if (meeting === undefined) return;

  const isHost = false; // TODO : 사용자 === 작성자

  return isHost ? (
    <ApplyMeetingPage meeting={meeting} />
  ) : (
    <PostEditPage meeting={meeting} />
  );
};

export default PostDetailPage;
