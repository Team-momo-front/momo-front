import { useParams } from 'react-router-dom';
import ParticipantList from '../components/MyPage/ParticipantList';
import PostCard from '../components/PostCard';
import useDeleteMeeting from '../hooks/useDeleteMeeting';

import { useCloseMeeting } from '../hooks/useCloseMeeting';
import { posts } from '../mocks/posts';

const ViewParticipantPage = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate: deleteMeeting } = useDeleteMeeting();
  const { mutate: closeMeeting } = useCloseMeeting();
  const selectedPost = posts.find(post => post.id === id) || null;
  const isFinished = selectedPost?.status === '모집 완료';

  if (id === undefined) return;

  const handleCloseMeeting = () => {
    if (confirm('모집을 완료하시겠습니까?')) {
      closeMeeting(id);
    }
  };

  const handleDeleteMeeting = () => {
    if (confirm('모임을 취소하시겠습니까?')) {
      deleteMeeting(id);
    }
  };

  return (
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
                    onClick={handleCloseMeeting}
                  >
                    모집 완료
                  </button>

                  <button
                    type="button"
                    className="btn btn-second flex-1 transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
                    onClick={handleDeleteMeeting}
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
  );
};

export default ViewParticipantPage;
