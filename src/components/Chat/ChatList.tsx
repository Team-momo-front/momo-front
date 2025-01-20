import { useSetRecoilState } from 'recoil';
import { isChatModalOpenState } from '../../states/recoilState';
import { ChatRoomResponse } from '../../types/Chat';

interface ChatListProps {
  chats: ChatRoomResponse[];
  onChatClick: (chat: ChatRoomResponse) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatClick }) => {
  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);

  return (
    <>
      <div className="relative w-full font-bold text-xl flex items-center justify-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <span className="block">채팅</span>
        <button
          className="absolute right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setIsChatModalOpen(false)}
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
      {chats.length > 0 ? (
        <ul className="flex flex-col justify-center gap-4 py-4">
          {chats.map(chat => (
            <li
              key={chat.roomId}
              className="flex justify-between items-center cursor-pointer hover:translate-x-1 duration-300 ease-in-out"
              onClick={() => onChatClick(chat)}
            >
              <img
                src={chat.meetingThumbnail}
                alt="Chatting Room Thumbnail"
                className="w-10 h-10 rounded-full border-[1px] border-black bg-white p-1 mr-2"
              />
              <div className="flex flex-1">
                <div>
                  <span className="font-bold text-[16px]">
                    {chat.meetingTitle}
                  </span>
                  <p className="text-sm">{chat.lastMessage}</p>
                </div>
              </div>
              {chat.unreadMessagesCount && (
                <div className="flex justify-center items-center">
                  <span className="block bg-primary px-2 py-1 rounded-full font-bold text-xs">
                    {chat.unreadMessagesCount >= 100
                      ? '99+'
                      : chat.unreadMessagesCount}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-[400px] flex justify-center items-center font-bold text-sm text-center">
          현재 참가한 채팅방이 없습니다.
          <br />
          모임에 참가해 보세요!
        </div>
      )}
    </>
  );
};

export default ChatList;
