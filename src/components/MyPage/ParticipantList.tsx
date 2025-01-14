import { useState, useEffect } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { users } from '../../mocks/users';
import { useNavigate } from 'react-router-dom';

const ParticipantList = ({
  post,
  isFinished,
}: {
  post: Post;
  isFinished: boolean;
}) => {
  const [participants, setParticipants] = useState(users);

  useEffect(() => {
    if (post.participatedUserId) {
      // TODO: User Token으로 서버와 통신해 참가자 목록 받아오기
      const filteredParticipants = users.filter(user =>
        post.participatedUserId?.includes(user.userId)
      );
      setParticipants(filteredParticipants);
    }
  }, [post.participatedUserId]);

  const { pendingUsers, approvedUsers } = participants.reduce(
    (acc: { pendingUsers: User[]; approvedUsers: User[] }, participant) => {
      if (participant.status === 'pending') {
        acc.pendingUsers.push(participant);
      } else if (participant.status === 'approved') {
        acc.approvedUsers.push(participant);
      }
      return acc;
    },
    { pendingUsers: [], approvedUsers: [] }
  );

  const navigate = useNavigate();

  const handleGoToProfile = (participantId: string, status: string) => {
    navigate(`/view-applicant/profile/${participantId}?status=${status}`);
  };

  const renderUserList = (users: User[], title: string) => (
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
                handleGoToProfile(participant.userId, participant.status)
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
              <span className="font-bold text-sm">{participant.nickname}</span>
            </li>
          ))
        ) : (
          <span className="font-bold text-sm">현재 아무도 없습니다.</span>
        )}
      </ul>
    </div>
  );

  return (
    <div className="min-w-[340px] md:min-w-96 flex flex-col gap-3 h-full">
      {!isFinished && renderUserList(pendingUsers, '참여 신청')}
      {renderUserList(approvedUsers, '참여 확정')}
    </div>
  );
};

export default ParticipantList;
