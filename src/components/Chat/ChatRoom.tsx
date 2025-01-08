import { Chat } from '../../types/Chat';
// import { FaArrowLeft } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

import { RxHamburgerMenu } from 'react-icons/rx';

interface ChatRoomProps {
  chat: Chat | null;
  handleBackBtn: () => void;
}

const ChatRoom = ({ chat, handleBackBtn }: ChatRoomProps) => {
  if (!chat) return null;

  // TODO: chat.roomId로 채팅 기록 조회

  return (
    <>
      <div className="w-full font-bold text-xl flex items-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <button type="button" onClick={handleBackBtn} className="mr-4">
          <IoArrowBack />
        </button>
        <div className="flex justify-between items-center flex-1 max-w-[80%] gap-4">
          <span className="block text-lg truncate">{chat.meetingTitle}</span>
        </div>
        <RxHamburgerMenu />
      </div>

      <div className="py-4">
        <p>{chat.lastMessage}</p>
      </div>
    </>
  );
};

export default ChatRoom;
