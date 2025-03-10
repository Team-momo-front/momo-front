import { useParams } from 'react-router-dom';
import ApplyMeetingPage from './ApplyMeetingPage';
import PostEditPage from './PostEditPage';
import useSearchMeetings from '../hooks/useSearchMeetings';
import { Post } from '../types/Post';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useSearchMeetings({});
  const posts: Post[] = data?.meetings || [];
  const meeting = posts.find(meeting => meeting.id === Number(id));

  if (meeting === undefined) return;
  const hostId = localStorage.getItem('userId');
  const isHost = Number(hostId) === meeting.authorId;

  return isHost ? (
    <PostEditPage meeting={meeting} refetch={refetch} />
  ) : (
    <ApplyMeetingPage meeting={meeting} />
  );
};

export default PostDetailPage;
