import { useState } from 'react';
import { chats } from '../../mocks/chats';
import { Chat } from '../../types/Chat';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const ChatModal = () => {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const openChatRoom = (chat: Chat) => {
    setSelectedChat(chat);
    setIsChatRoomOpen(true);
  };

  const closeChatRoom = () => {
    setSelectedChat(null);
    setIsChatRoomOpen(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[40px] shadow-lg w-80 h-[75vh]">
        {isChatRoomOpen ? (
          <ChatRoom chat={selectedChat} handleBackBtn={closeChatRoom} />
        ) : (
          <ChatList chats={chats} onChatClick={openChatRoom} />
        )}
      </div>
    </div>
  );
};

export default ChatModal;
