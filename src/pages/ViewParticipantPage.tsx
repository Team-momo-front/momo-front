import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ParticipantList from '../components/MyPage/ParticipantList';
import PostCard from '../components/PostCard';
import useDeleteMeeting from '../hooks/useDeleteMeeting';
import { useCloseMeeting } from '../hooks/useCloseMeeting';
import useSearchMeetings from '../hooks/useSearchMeetings';
import { Post } from '../types/Post';

const ViewParticipantPage = () => {
  const { data } = useSearchMeetings({});
  const { id } = useParams<{ id: string }>();
  const meetingId = Number(id);
  const { mutate: deleteMeeting } = useDeleteMeeting();
  const { mutate: closeMeeting } = useCloseMeeting();
  const posts: Post[] = data?.meetings || [];
  const meeting = posts.find(meeting => meeting.id === Number(id));
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const isFinished = status === 'CLOSED';

  if (meeting === undefined || id === undefined) return;

  const handleCloseMeeting = () => {
    if (confirm('모집을 완료하시겠습니까?')) {
      closeMeeting(id);
    }
  };

  const handleDeleteMeeting = () => {
    if (confirm('모임을 취소하시겠습니까?')) {
      deleteMeeting(id);
    }
  };

  const handleClickCard = () => {
    navigate(`/post/${meetingId}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-14 md:mt-0 md:gap-20 md:flex-row md:items-start">
      {posts && (
        <>
          <div className="w-[340px] pt-20">
            <div className="w-full flex justify-center items-center">
              <PostCard
                post={meeting}
                isHosted={true}
                onClick={handleClickCard}
              />
            </div>
            {!isFinished && (
              <div className="w-full flex items-center gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-primary flex-1 transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
                  onClick={handleCloseMeeting}
                >
                  모집 완료
                </button>

                <button
                  type="button"
                  className="btn btn-second flex-1 transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
                  onClick={handleDeleteMeeting}
                >
                  모집 취소
                </button>
              </div>
            )}
          </div>
          <ParticipantList post={meeting} isFinished={isFinished} />
        </>
      )}
    </div>
  );
};

export default ViewParticipantPage;
