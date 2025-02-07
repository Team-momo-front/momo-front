import { useNavigate } from 'react-router-dom';
import { useGetParticipants } from '../../hooks/useGetParticipants';
import { Post } from '../../types/Post';
import { Participants } from '../../types/User';

const ParticipantList = ({
  post,
  isFinished,
}: {
  post: Post;
  isFinished: boolean;
}) => {
  const { data: users } = useGetParticipants(post.id);
  const navigate = useNavigate();

  const pendingUsers =
    users?.filter(user => user.participationStatus === 'PENDING') || [];
  const approvedUsers =
    users?.filter(user => user.participationStatus === 'APPROVED') || [];

  const handleGoToProfile = (
    participantId: number,
    userId: number,
    status: string
  ) => {
    navigate(
      `/view-applicant/profile/${participantId}/${userId}/${post.id}?status=${status}`
    );
  };

  const renderUserList = (users: Participants[], title: string) => (
    <div className="mb-4">
      <span className="block text-lg font-extrabold mb-3 cursor-default">
        {title}
      </span>
      <ul className="flex flex-col gap-2">
        {users.length > 0 ? (
          users.map((participant, index) => (
            <li
              key={index}
              className="p-2 flex items-center gap-2 border-gray-300 border-[1px] rounded-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
              onClick={() =>
                handleGoToProfile(
                  participant.participationId,
                  participant.userId,
                  participant.participationStatus
                )
              }
            >
              <img
                src={
                  participant.profileImage ||
                  '/image/default_profile_image.webp'
                }
                alt={participant.nickname}
                className="w-10 h-10 rounded-full p-[1px] bg-white border-gray-600 border-[1px]"
              />
              <span className="font-bold text-sm">
                {participant.nickname || `anony${participant.userId}`}
              </span>
            </li>
          ))
        ) : (
          <span className="font-bold text-sm">현재 아무도 없습니다.</span>
        )}
      </ul>
    </div>
  );

  return (
    <div className="min-w-[340px] md:min-w-96 flex flex-col gap-3 h-full pt-20">
      {!isFinished && renderUserList(pendingUsers, '참여 신청')}
      {renderUserList(approvedUsers, '참여 확정')}
    </div>
  );
};

export default ParticipantList;
