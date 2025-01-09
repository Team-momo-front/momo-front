import { RxHamburgerMenu } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import { chat1ParticipantList } from '../../mocks/chat1';
import { Chat } from '../../types/Chat';
import { Link } from 'react-router-dom';

interface ChatParticipantListProps {
  chat: Chat | null;
  handleBackBtn: (chat: Chat) => void;
}

const ChatParticipantList = ({
  chat,
  handleBackBtn,
}: ChatParticipantListProps) => {
  if (!chat) return null;

  // TODO: chat.roomId로 참여자 목록 조회 API 호출

  const handleExitChatRoom = () => {
    // TODO: API 참가한 모임에서 DELETE 요청
    // /api/v1/chatrooms/{roomId}/leave
    console.log(chat.roomId);
    console.log('exit');
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full font-bold text-xl flex items-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <button
          type="button"
          onClick={() => handleBackBtn(chat)}
          className="mr-4"
        >
          <RxHamburgerMenu />
        </button>
        <div className="flex justify-between items-center flex-1 max-w-[80%] gap-4">
          <span className="block text-lg truncate">{chat.meetingTitle}</span>
        </div>
      </div>

      <ul className="flex flex-col my-4 gap-4">
        {chat1ParticipantList.map((participant, index) => (
          <Link
            key={index}
            to={`/chat/profile/${chat.roomId}/${participant.id}`}
          >
            <li key={index} className="flex gap-2 items-center cursor-pointer">
              <img
                src={participant.profileImageUrl}
                alt="participant profile image"
                className="w-10 h-10 rounded-full border-[1px] border-black bg-white p-[1px] mr-2"
              />
              <span className="font-bold">{participant.nickname}</span>
            </li>
          </Link>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleExitChatRoom}
        className="absolute bottom-0"
      >
        <MdLogout className="text-2xl cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatParticipantList;
