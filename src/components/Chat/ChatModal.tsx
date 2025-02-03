import { ChatHistoryResponse, ChatRoomResponse } from '../../types/Chat';
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
import { useGetChatHistory } from '../../hooks/Chat/useGetChatHistory';
import { useState } from 'react';

const ChatModal = () => {
  const { data, isLoading, error } = useGetChatRoomList();
  const { mutateAsync: getChatHistory } = useGetChatHistory();

  const [isChatRoomOpen, setIsChatRoomOpen] =
    useRecoilState(isChatRoomOpenState);
  const [isChatListOpen, setIsChatListOpen] =
    useRecoilState(isChatListOpenState);
  const [isViewParticipantListOpen, setIsViewParticipantListOpen] =
    useRecoilState(isViewParticipantListOpenState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [chatHistory, setChatHistory] = useState<ChatHistoryResponse[] | null>(
    null
  );
  const navigate = useNavigate();

  const openChatRoom = async (chat: ChatRoomResponse) => {
    setSelectedChat(chat);

    try {
      const chatHistory = await getChatHistory(chat.roomId);
      setChatHistory(chatHistory);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        console.log(error.message);
      }
    }

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

  if (error) {
    if (error instanceof AxiosError && error.response?.status === 403) {
      setIsChatRoomOpen(false);
      navigate('/login');
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="relative bg-white p-6 rounded-[40px] shadow-lg w-80 h-[75vh] animate-displayUp">
        {isChatListOpen && data && (
          <ChatList chats={data} onChatClick={openChatRoom} />
        )}

        {selectedChat && isChatRoomOpen && (
          <ChatRoom
            chat={selectedChat}
            chatHistory={chatHistory}
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
