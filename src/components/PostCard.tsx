import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { Post } from '../types/Post';
import { formatDate } from '../utils/formatDate';

const PostCard = ({ post, onClick }: { post: Post; onClick: () => void }) => {
  const hasThumbnail = post.thumbnail !== undefined;

  return (
    <div
      className="w-full aspect-[300/370] px-4 py-6 border shadow-md 
      transform transition-all duration-300 ease-in-out 
      hover:translate-y-[4px] hover:shadow-lg cursor-pointer space-y-2 bg-white"
      onClick={onClick}
    >
      {hasThumbnail && (
        <img
          src="image/placeholder_thumbnail.webp"
          alt={post.title}
          className="w-full h-1/2 rounded-lg object-cover"
        />
      )}
      <div className="px-2 space-y-1">
        <h2 className="text-lg font-extrabold truncate">{post.title}</h2>
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
    </div>
  );
};

export default PostCard;
