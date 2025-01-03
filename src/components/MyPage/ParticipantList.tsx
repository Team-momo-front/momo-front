import { useState, useEffect } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { users } from '../../mocks/users';
import { useNavigate } from 'react-router-dom';

const ParticipantList = ({ post }: { post: Post }) => {
  const [participants, setParticipants] = useState(users);

  useEffect(() => {
    if (post.participatedUserId) {
      const filteredParticipants = users.filter(user =>
        post.participatedUserId?.includes(user.userId)
      );
      setParticipants(filteredParticipants);
    }
  }, [post.participatedUserId]);

  const pendingUsers = participants.filter(
    participant => participant.status === 'pending'
  );

  const approvedUsers = participants.filter(
    participant => participant.status === 'approved'
  );

  const navigate = useNavigate();

  const handleGoToProfile = (participantId: number) => {
    navigate(`/profile/${participantId}`);
  };

  const renderUserList = (users: User[], title: string) => (
    <div>
      <span className="block text-lg font-extrabold mb-3 cursor-default">
        {title}
      </span>
      <ul className="flex flex-col gap-2">
        {users.map((participant, index) => (
          <li
            key={index}
            className="py-[10px] px-2 flex items-center gap-2 border-gray-300 border-[1px] rounded-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:translate-y-[-4px]"
            onClick={() => handleGoToProfile(participant.id)}
          >
            <img
              src={
                participant.profileImage || '/image/default_profile_image.webp'
              }
              alt={participant.nickname}
              className="w-10 h-10 rounded-full p-[1px] bg-white border-gray-600 border-[1px]"
            />
            <span className="font-bold text-sm">{participant.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-w-[340px] md:min-w-96 grid grid-rows-2 gap-3 h-full">
      {renderUserList(pendingUsers, '참여 신청')}
      {renderUserList(approvedUsers, '참여 확정')}
    </div>
  );
};

export default ParticipantList;
