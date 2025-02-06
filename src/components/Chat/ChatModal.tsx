import { ChatRoomResponse } from '../../types/Chat';
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
import useGetChatRoomList from '../../hooks/useGetChatRoomList';
import LoadingSpinner from '../LoadingSpinner';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetOutChatRoom } from '../../hooks/useGetOutChatRoom';

const ChatModal = () => {
  const { data, isLoading, error, isSuccess } = useGetChatRoomList();
  const { mutate: getOutChatRoom } = useGetOutChatRoom();

  const [isChatRoomOpen, setIsChatRoomOpen] =
    useRecoilState(isChatRoomOpenState);
  const [isChatListOpen, setIsChatListOpen] =
    useRecoilState(isChatListOpenState);
  const [isViewParticipantListOpen, setIsViewParticipantListOpen] =
    useRecoilState(isViewParticipantListOpenState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const navigate = useNavigate();

  const openChatRoom = (chat: ChatRoomResponse) => {
    setSelectedChat(chat);
    setIsViewParticipantListOpen(false);
    setIsChatListOpen(false);
    setIsChatRoomOpen(true);
  };

  const openChatList = (chat: ChatRoomResponse) => {
    setSelectedChat(null);
    setIsChatRoomOpen(false);
    setIsChatListOpen(true);
    getOutChatRoom(chat.roomId);
  };

  if (isSuccess) console.log('채팅 목록 업데이트');

  const openViewParticipantList = () => {
    setIsChatRoomOpen(false);
    setIsChatListOpen(false);
    setIsViewParticipantListOpen(true);
  };

  if (error) {
    if (error instanceof AxiosError && error.response?.status === 403) {
      setIsChatRoomOpen(false);
      navigate('/login');
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn z-30">
      <div className="relative bg-white p-6 rounded-[40px] shadow-lg w-80 h-[75vh] animate-displayUp">
        {isChatListOpen && data && (
          <ChatList chats={data} onChatClick={openChatRoom} />
        )}

        {selectedChat && isChatRoomOpen && (
          <ChatRoom
            chat={selectedChat}
            handleBackBtn={() => openChatList(selectedChat)}
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
