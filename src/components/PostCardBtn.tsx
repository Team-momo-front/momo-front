import { useNavigate } from 'react-router-dom';
import { CreatedMeeting, ParticipantsResponse } from '../types/Meeting';

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

  const handleGoToPostBtnClick = () => {
    navigate(`/post/${post.meetingId}`);
  };

  const handleAdminBtnClick = () => {
    navigate(`/view-applicant/${post.meetingId}?status=${status}`);
  };

  const handleDeleteBtnClick = () => {
    // TODO: API 참가한 모임 목록에서 DELETE 요청
  };

  const isAvailableDelete =
    status === '승인 거부' || status === '모집 취소' || status === '모집 완료';

  const isAvailableViewPost = status === 'RECRUITING';

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
          <button
            type="button"
            onClick={() => handleAdminBtnClick()}
            className="btn btn-second btn-sm font-bold flex-1"
          >
            신청자 보기
          </button>
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
