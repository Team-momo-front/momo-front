import { useNavigate } from 'react-router-dom';
import { CreatedMeeting, ParticipantsResponse } from '../types/Meeting';
import useDeleteMeeting from '../hooks/useDeleteMeeting';
import useDeleteParticipation from '../hooks/useDeleteParticipation';

interface PostCardBtnProps {
  post: CreatedMeeting | ParticipantsResponse;
  isHosted?: boolean;
  isParticipated?: boolean;
  status?: string;
}
const PostCardBtn: React.FC<PostCardBtnProps> = ({
  post,
  isHosted,
  isParticipated,
  status,
}) => {
  const navigate = useNavigate();
  const { mutate: deleteMeeting } = useDeleteMeeting();
  const { mutate: deleteParticipation } = useDeleteParticipation();

  const handleGoToPostBtnClick = () => {
    navigate(`/post/${post.meetingId}`);
  };

  const handleAdminBtnClick = () => {
    navigate(`/view-applicant/${post.meetingId}?status=${status}`);
  };

  const handleDeleteMeetingBtnClick = () => {
    deleteMeeting(post.meetingId.toString());
  };

  const handleDeleteBtnClick = () => {
    if ('participationId' in post) {
      deleteParticipation(post.participationId);
    }
  };

  const isAvailableViewPost = status === 'RECRUITING';
  const isAvailableDelete = status === 'CLOSED' || 'REJECTED';

  return (
    <>
      {isHosted && (
        <div
          className={`absolute bottom-0 right-0 px-4 py-6 w-full flex justify-between gap-4`}
        >
          {isAvailableViewPost ? (
            <button
              type="button"
              onClick={handleGoToPostBtnClick}
              className="btn btn-second btn-sm font-bold flex-1"
            >
              모집글 보기
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {isAvailableDelete ? (
            <button
              type="button"
              onClick={() => handleDeleteMeetingBtnClick()}
              className="btn btn-second btn-sm font-bold flex-1"
            >
              모임 삭제
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAdminBtnClick()}
              className="btn btn-second btn-sm font-bold flex-1"
            >
              신청자 보기
            </button>
          )}
        </div>
      )}
      {isParticipated && (
        <div
          className={`absolute bottom-0 right-0 px-4 py-6 w-full flex justify-between gap-4`}
        >
          <button
            type="button"
            onClick={() => handleGoToPostBtnClick()}
            className="btn btn-second btn-sm font-bold flex-1"
          >
            모집글 보기
          </button>
          {isAvailableDelete ? (
            <button
              type="button"
              onClick={() => handleDeleteBtnClick()}
              className="btn btn-second btn-sm font-bold flex-1"
            >
              삭제
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </>
  );
};

export default PostCardBtn;
