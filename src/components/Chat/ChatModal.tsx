import { useState } from 'react';
import { chats } from '../../mocks/chats';
import { Chat } from '../../types/Chat';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import ChatParticipantList from './ChatParticipantList';

const ChatModal = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isViewParticipantListOpen, setIsViewParticipantListOpen] =
    useState(false);

  const openChatRoom = (chat: Chat) => {
    setSelectedChat(chat);
    setIsChatListOpen(false);
    setIsChatRoomOpen(true);
  };

  const openChatList = () => {
    setSelectedChat(null);
    setIsChatRoomOpen(false);
    setIsChatListOpen(true);
  };

  const openViewParticipantList = () => {
    setIsChatRoomOpen(false);
    setIsChatListOpen(false);
    setIsViewParticipantListOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[40px] shadow-lg w-80 h-[75vh]">
        {isChatListOpen && (
          <ChatList chats={chats} onChatClick={openChatRoom} />
        )}

        {isChatRoomOpen && (
          <ChatRoom
            chat={selectedChat}
            handleBackBtn={openChatList}
            handleViewParticipantList={openViewParticipantList}
          />
        )}

        {isViewParticipantListOpen && (
          <ChatParticipantList
            chat={selectedChat}
            handleBackBtn={openChatRoom}
          />
        )}
      </div>
    </div>
  );
};

export default ChatModal;
