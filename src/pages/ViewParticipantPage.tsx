import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PostCard from '../components/PostCard';
import { posts } from '../mocks/posts';
import { Post } from '../types/Post';
import ParticipantList from '../components/MyPage/ParticipantList';

const ViewParticipantPage = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const nowPost = posts.find(post => post.id === id);
    setSelectedPost(nowPost || null);
  }, [id]);

  const isFinished = selectedPost?.status === '모집 완료';

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-62px)] flex justify-center items-center overflow-auto">
        <div className="w-full mt-[300px] flex flex-col justify-center items-center gap-14 md:mt-0 md:gap-20 md:flex-row md:items-start">
          {selectedPost && (
            <>
              <div className="w-[340px]">
                <PostCard post={selectedPost} isHosted={true} />
                {!isFinished && (
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
                )}
              </div>
              <ParticipantList post={selectedPost} isFinished={isFinished} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewParticipantPage;
