import { Chat } from '../../types/Chat';
import { IoArrowBack } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { chat1 } from '../../mocks/chat1';
import ChatInput from './ChatInput';

interface ChatRoomProps {
  chat: Chat | null;
  handleBackBtn: () => void;
  handleViewParticipantList: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chat,
  handleBackBtn,
  handleViewParticipantList,
}) => {
  if (!chat) return null;

  // TODO: chat.roomId로 채팅 기록 조회
  // TODO: 로그인 유저 Id로 내가 보낸 메세지 필터링
  const nowUserId = 'user_113';

  return (
    <>
      <div className="w-full font-bold text-xl flex items-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <button type="button" onClick={handleBackBtn} className="mr-4">
          <IoArrowBack />
        </button>
        <div className="flex justify-between items-center flex-1 max-w-[80%] gap-4">
          <span className="block text-lg truncate">{chat.meetingTitle}</span>
        </div>
        <button type="button" onClick={handleViewParticipantList}>
          <RxHamburgerMenu />
        </button>
      </div>

      <div className="py-4 overflow-scroll max-h-[90%]">
        {chat1.map((chat, index) => (
          <div
            key={index}
            className={`chat ${
              chat.userId === nowUserId ? 'chat-end' : 'chat-start'
            } mb-1`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="userProfileImageUrl"
                  src={chat.userProfileImageUrl}
                  className="w-10 h-10 rounded-full border-[1px] border-black bg-white p-[1px] mr-2"
                />
              </div>
            </div>
            <div className="chat-header mb-1 text-[12px]">
              {chat.userNickname}
            </div>
            <div
              className={`chat-bubble ${
                chat.userId === nowUserId ? 'bg-primary' : 'bg-gray-300'
              } text-sm py-2`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>

      <ChatInput roomId={chat.roomId} />
    </>
  );
};

export default ChatRoom;
