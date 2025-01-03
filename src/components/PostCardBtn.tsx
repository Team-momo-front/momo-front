import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';

interface PostCardBtnProps {
  post: Post;
  isHosted?: boolean;
  isParticipated?: boolean;
}
const PostCardBtn: React.FC<PostCardBtnProps> = ({
  post,
  isHosted,
  isParticipated,
}) => {
  const navigate = useNavigate();

  const handleGoToPostBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  };

  const handleAdminBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/post/view-applicant/${post.id}`);
  };

  const handleDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: API 참가한 모임 목록에서 DELETE 요청
  };

  return (
    <>
      {isHosted && (
        <div
          className={`absolute bottom-0 right-0 px-4 py-6 w-full flex justify-between gap-4`}
        >
          <button
            type="button"
            onClick={e => handleGoToPostBtnClick(e)}
            className="btn btn-second btn-sm font-bold z-100 flex-1"
          >
            모집글 보기
          </button>
          <button
            type="button"
            onClick={e => handleAdminBtnClick(e)}
            className="btn btn-second btn-sm font-bold z-100 flex-1"
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
            onClick={e => handleGoToPostBtnClick(e)}
            className="btn btn-second btn-sm font-bold z-100 flex-1"
          >
            모집글 보기
          </button>
          <button
            type="button"
            onClick={e => handleDeleteBtnClick(e)}
            className="btn btn-second btn-sm font-bold z-100 flex-1"
          >
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default PostCardBtn;
