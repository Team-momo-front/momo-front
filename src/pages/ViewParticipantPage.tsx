import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PostCard from '../components/PostCard';
import { posts } from '../mocks/posts';
import { Post } from '../types/Post';
import ParticipantList from '../components/MyPage/ParticipantList';

const ViewParticipantPage = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const nowPost = posts.find(post => post.id === id);
    setSelectedPost(nowPost || null);
  }, [id]);

  return (
    <>
      <Header />
      <div className="h-screen flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mt-44 gap-14 md:mt-0 md:gap-20 md:flex-row md:items-start">
          {selectedPost && (
            <>
              <div className="w-[340px]">
                <PostCard
                  post={selectedPost}
                  className={'hover:translate-y-[-4px]'}
                />
                <div className="w-full flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary flex-1 transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
                  >
                    모집 완료
                  </button>
                  <button
                    type="button"
                    className="btn btn-second flex-1 transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
                  >
                    모집 취소
                  </button>
                </div>
              </div>
              <ParticipantList post={selectedPost} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewParticipantPage;
