import { useRef, useEffect } from 'react';
import { ChatHistoryResponse, ChatRoomResponse } from '../../types/Chat';
import { IoArrowBack } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import ChatInput from './ChatInput';

interface ChatRoomProps {
  chat: ChatRoomResponse;
  chatHistory: ChatHistoryResponse[];
  handleBackBtn: () => void;
  handleViewParticipantList: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chat,
  chatHistory,
  handleBackBtn,
  handleViewParticipantList,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const myUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      <div className="w-full font-bold text-xl flex items-center border-b-[1px] border-gray-300 pb-5 pt-1 animate-fadeIn">
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

      <div className="py-2 pb-14 overflow-scroll max-h-[90%]" ref={scrollRef}>
        {chatHistory &&
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat ${
                chat.userId === myUserId
                  ? 'chat-end animate-displayLeft'
                  : 'chat-start animate-displayRight'
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
                  chat.userId === myUserId ? 'bg-primary' : 'bg-gray-300'
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
