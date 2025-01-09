import { Chat } from '../../types/Chat';

interface ChatListProps {
  chats: Chat[];
  onChatClick: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatClick }) => {
  return (
    <>
      <div className="w-full font-bold text-xl flex items-center justify-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <span className="block">채팅</span>
      </div>
      <ul className="flex flex-col justify-center gap-4 py-4">
        {chats.map(chat => (
          <li
            key={chat.roomId}
            className="flex justify-between items-center cursor-pointer hover:translate-x-1 duration-300 ease-in-out"
            onClick={() => onChatClick(chat)}
          >
            <img
              src={chat.meetingThumbnailUrl}
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
    </>
  );
};

export default ChatList;
