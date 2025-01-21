import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { Post } from '../types/Post';
import { formatDate } from '../utils/formatDate';
import { getStatusAndColorByRole } from '../utils/getStatusAndColorByRole';
import PostCardBtn from './PostCardBtn';

interface PostCardProps {
  post: Post;
  isHosted?: boolean;
  isParticipated?: boolean;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isHosted,
  isParticipated,
  onClick,
}) => {
  const location = useLocation();
  const isViewApplicantPage = location.pathname.includes('/view-applicant');

  const hasThumbnail = post.thumbnail ? true : false;

  let status, color;

  if (isHosted) {
    ({ status, color } = getStatusAndColorByRole(post.status, 'isHosted'));
  } else if (isParticipated && post.participationStatus) {
    ({ status, color } = getStatusAndColorByRole(
      post.participationStatus,
      'isParticipated'
    ));
  }

  return (
    <div
      className={`w-full aspect-[300/370] px-4 py-6 border shadow-md 
      transform transition-all duration-300 ease-in-out 
      hover:translate-y-[4px] hover:shadow-lg cursor-pointer space-y-2 bg-white ㅎㅁ ${
        isHosted || isParticipated ? 'pb-[70px] min-h-[420px]' : 'min-h-[370px]'
      }`}
      onClick={onClick}
    >
      <img
        src={hasThumbnail ? post.thumbnail : '/image/thumbnail_default.webp'}
        alt={post.title}
        className="w-full h-1/2 rounded-lg object-cover"
      />
      <div className="px-2 space-y-1 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-lg font-extrabold truncate">{post.title}</h2>
          {isHosted && (
            <div className="flex gap-1 items-center shrink-0">
              <span className={`w-2 h-2 rounded-full ${color}`}></span>
              <p className="font-bold text-sm">{status}</p>
            </div>
          )}
          {isParticipated && (
            <div className="flex gap-1 items-center shrink-0">
              <span
                className={`w-2 h-2 rounded-full 
                  ${color}`}
              ></span>
              <p className="font-bold text-sm">{status}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm flex items-center gap-x-1">
            <FaCalendar className="w-4 h-4" />
            {formatDate(post.meetingDateTime)}
          </p>
          <p className="text-base font-extrabold flex items-center">
            <FaPerson className="w-4 h-4" />
            {`${post.approvedCount}/${post.maxCount}`}
          </p>
        </div>
        <p className="text-sm flex items-center gap-x-1">
          <FaMapMarkerAlt className="w-3.5 h-4" />
          {post.address}
        </p>
        <div className="flex flex-wrap gap-x-1">
          {post.category.map((category, index) => (
            <span
              key={index}
              className="text-xs font-bold bg-primary w-fit rounded-full px-1.5 py-[2px]"
            >
              {category}
            </span>
          ))}
        </div>
        <p className="text-sm line-clamp-2">{post.content}</p>
      </div>

      {!isViewApplicantPage && (
        <PostCardBtn
          post={post}
          isHosted={isHosted}
          isParticipated={isParticipated}
          status={status}
        />
      )}
    </div>
  );
};

export default PostCard;
