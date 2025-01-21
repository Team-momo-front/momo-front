import { useParams } from 'react-router-dom';
// import { meetings } from '../mocks/meetings';
import ApplyMeetingPage from './ApplyMeetingPage';
import PostEditPage from './PostEditPage';
import useSearchMeetings from '../hooks/useSearchMeetings';
import { Post } from '../types/Post';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSearchMeetings({});
  const posts: Post[] = data?.meetings || [];
  const meeting = posts.find(meeting => meeting.id === Number(id));

  if (meeting === undefined) return;
  const hostId = localStorage.getItem('userId');
  const isHost = Number(hostId) === meeting.authorId ? true : false;

  return isHost ? (
    <PostEditPage meeting={meeting} />
  ) : (
    <ApplyMeetingPage meeting={meeting} />
  );
};

export default PostDetailPage;
