import PostCard from '../PostCard';
import { useRecoilValue } from 'recoil';
import { isActiveState } from '../../states/recoilState';
import useGetMyParticipatedMeetings from '../../hooks/useGetMyParticipatedMeetings';

const ParticipatedMeetings = () => {
  const { data } = useGetMyParticipatedMeetings({});
  const isActive = useRecoilValue(isActiveState);

  if (data === undefined) return;

  const posts = data.allData.appliedMeetings;

  return (
    <div className="px-16 py-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-start mt-[26px]">
        {posts.map((post, index) => (
          <div key={index} className="w-full">
            <PostCard
              post={post}
              isParticipated={isActive === 'isParticipated'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatedMeetings;
