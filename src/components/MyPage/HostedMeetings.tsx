import { useState } from 'react';
import PostCard from '../PostCard';
import { posts } from '../../mocks/posts';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isActiveState } from '../../states/recoilState';

const HostedMeetings = () => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const isActive = useRecoilValue(isActiveState);

  // TODO: User Token으로 서버와 통신해 주최한 모임 받아오기
  // 현재는 목데이터 사용
  const userId = 'user_113';

  useEffect(() => {
    const hostedPosts = posts.filter(post => post.hostedUserId === userId);
    setFilteredPosts(hostedPosts);
  }, []);

  return (
    <div className="px-16 py-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-start mt-[26px]">
        {filteredPosts.map((post, index) => (
          <div key={index} className="w-full">
            <PostCard post={post} isHosted={isActive == 'isHosted'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostedMeetings;
