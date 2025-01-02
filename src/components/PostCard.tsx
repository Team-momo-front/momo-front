import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import { formatDate } from '../utils/formatDate';

interface PostCardProps {
  post: Post;
  isHosted?: boolean;
  // isParticipated?: boolean;
}
const PostCard: React.FC<PostCardProps> = ({
  post,
  isHosted,
  // isParticipated,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleAdminBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //+
    e.stopPropagation();
    navigate(`/post/view-applicant/${post.id}`);
  };

  const hasThumbnail = post.thumbnail !== undefined;

  return (
    <div
      className={`w-full aspect-[300/370] px-4 py-6 border shadow-md 
      transform transition-all duration-300 ease-in-out 
      hover:translate-y-[4px] hover:shadow-lg cursor-pointer space-y-2 bg-white ${
        isHosted ? 'pb-[70px] min-h-[420px]' : 'min-h-[370px]'
      }
      }`}
      onClick={handleClick}
    >
      {hasThumbnail && (
        <img
          src="/image/placeholder_thumbnail.webp"
          alt={post.title}
          className="w-full h-1/2 rounded-lg object-cover"
        />
      )}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-lg font-extrabold truncate">{post.title}</h2>
          {isHosted && (
            <div className="flex gap-1 items-center shrink-0">
              <span
                className={`w-2 h-2 rounded-full ${
                  post.status === '모집 완료' ? 'bg-primary' : 'bg-gray-400'
                }`}
              ></span>
              <p className="font-bold text-sm">{post.status}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm flex items-center gap-x-1">
            <FaCalendar className="w-4 h-4" />
            {formatDate(post.meetingDate)}
          </p>
          <p className="text-base font-extrabold flex items-center">
            <FaPerson className="w-4 h-4" />
            {`${post.approvedCount}/${post.participationCount}`}
          </p>
        </div>
        <p className="text-sm flex items-center gap-x-1">
          <FaMapMarkerAlt className="w-3.5 h-4" />
          {post.location}
        </p>
        <div className="flex flex-wrap gap-x-1">
          {post.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs font-bold bg-primary w-fit rounded-full px-1.5 py-[2px]"
            >
              {category}
            </span>
          ))}
        </div>
        <p
          className={`text-sm ${
            hasThumbnail ? 'line-clamp-2' : 'line-clamp-4'
          }`}
        >
          {post.content}
        </p>
      </div>
      {isHosted && (
        <div
          className={`absolute bottom-0 right-0 px-4 py-6 w-full flex justify-between gap-4`}
        >
          <button
            type="button"
            onClick={e => handleAdminBtnClick(e)}
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
    </div>
  );
};

export default PostCard;
