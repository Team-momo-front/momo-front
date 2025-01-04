import { useState, useEffect } from 'react';
import PostCard from '../PostCard';
import { posts } from '../../mocks/posts';
import { useRecoilValue } from 'recoil';
import { isActiveState } from '../../states/recoilState';

const ParticipatedMeetings = () => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const isActive = useRecoilValue(isActiveState);

  // TODO: User Token으로 서버와 통신해 주최한 모임 받아오기
  // 현재는 목데이터 사용
  const participatedUserId = 'user_512';

  useEffect(() => {
    const participatedPost = posts.filter(post => {
      return post.participatedUserId?.includes(participatedUserId);
    });
    setFilteredPosts(participatedPost);
    console.log(participatedPost);
  }, []);

  return (
    <div className="px-16 py-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-start mt-[26px]">
        {filteredPosts.map((post, index) => (
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
