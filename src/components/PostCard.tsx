import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import { formatDate } from '../utils/formatDate';

const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const hasThumbnail = post.thumbnail !== undefined;
  return (
    <div
      className="px-[10px] py-[15px] border w-[300px] h-[370px] shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] transform transition-all duration-300 ease-in-out 
      hover:translate-y-[4px] hover:shadow-[0_0_4px_0_rgba(0,0,0,0.25)] cursor-pointer space-y-2"
      onClick={handleClick}
    >
      {hasThumbnail && (
        <img
          src="image/placeholder_thumbnail.webp"
          alt={post.title}
          className="w-[280px] h-[180px] rounded-3xl"
        />
      )}
      <div className="px-[10px] space-y-1">
        <h2 className="text-xl font-extrabold truncate">{post.title}</h2>
        <div className="flex flex-row justify-between">
          <p className="text-sm flex flex-row items-center gap-x-1">
            <FaCalendar className="w-[18px] h-[18px]" />
            {formatDate(post.meetingDate)}
          </p>
          <p className="text-base font-extrabold flex flex-row items-center">
            <FaPerson className="h-4 h-4" />
            {`${post.approvedCount}/${post.participationCount}`}
          </p>
        </div>
        <p className="text-sm flex flex-row items-center gap-x-1">
          <FaMapMarkerAlt className="w-[13.5px] h-[18px]" />
          {post.location}
        </p>
        <div className="flex flex-wrap gap-x-1">
          {post.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs font-bold bg-primary w-fit rounded-[10px] px-1 py-[2px]"
            >
              {category}
            </span>
          ))}
        </div>
        <p
          className={`text-xs ${
            hasThumbnail ? 'line-clamp-2' : 'line-clamp-10'
          }`}
        >
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
