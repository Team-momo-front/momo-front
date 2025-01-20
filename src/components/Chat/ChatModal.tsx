// import { chats } from '../../mocks/chats';
import { Chat } from '../../types/Chat';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import ChatParticipantList from './ChatParticipantList';
import { useRecoilState } from 'recoil';
import {
  isChatListOpenState,
  isChatRoomOpenState,
  isViewParticipantListOpenState,
  selectedChatState,
} from '../../states/recoilState';
import useSearchChatRooms from '../../hooks/useSearchChatRooms';
import LoadingSpinner from '../LoadingSpinner';

const ChatModal = () => {
  const { data, isLoading } = useSearchChatRooms();

  const [isChatRoomOpen, setIsChatRoomOpen] =
    useRecoilState(isChatRoomOpenState);
  const [isChatListOpen, setIsChatListOpen] =
    useRecoilState(isChatListOpenState);
  const [isViewParticipantListOpen, setIsViewParticipantListOpen] =
    useRecoilState(isViewParticipantListOpenState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const openChatRoom = (chat: Chat) => {
    setSelectedChat(chat);
    setIsViewParticipantListOpen(false);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-[40px] shadow-lg w-80 h-[75vh] animate-displayUp">
        {isChatListOpen && data && (
          <ChatList chats={data} onChatClick={openChatRoom} />
        )}

        {isChatRoomOpen && (
          <ChatRoom
            chat={selectedChat}
            handleBackBtn={openChatList}
            handleViewParticipantList={openViewParticipantList}
          />
        )}

        {selectedChat && isViewParticipantListOpen && (
          <ChatParticipantList
            chat={selectedChat}
            handleBackBtn={openChatRoom}
          />
        )}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal;
