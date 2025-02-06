import { useRef, useEffect, useState } from 'react';
import {
  ChatMessageRequest,
  ChatMessageResponse,
  ChatRoomResponse,
} from '../../types/Chat';
import { IoArrowBack } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import ChatInput from './ChatInput';
import { Client, IMessage } from '@stomp/stompjs';
import { useGetChatHistory } from '../../hooks/useGetChatHistory';
import { AxiosError } from 'axios';

interface ChatRoomProps {
  chat: ChatRoomResponse;
  handleBackBtn: () => void;
  handleViewParticipantList: () => void;
}
const ChatRoom: React.FC<ChatRoomProps> = ({
  chat,
  handleBackBtn,
  handleViewParticipantList,
}) => {
  const { mutateAsync: getChatHistory } = useGetChatHistory();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const myUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const chatHistory = await getChatHistory(chat.roomId);
        setMessages(
          chatHistory.map(
            ({
              message,
              userId,
              userNickname: senderNickname,
              userProfileImageUrl,
            }) => ({
              roomId: chat.roomId,
              message,
              senderId: userId.toString(),
              senderNickname: senderNickname || `anony${userId}`,
              userProfileImageUrl,
            })
          )
        );
      } catch (error) {
        if (error && error instanceof AxiosError) {
          console.log(error.message);
        }
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://54.180.112.35:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ STOMP 연결 성공');

        client.subscribe(
          `/sub/chat/room/${chat.roomId}`,
          (message: IMessage) => {
            const msg: ChatMessageResponse = JSON.parse(message.body);
            setMessages(prevMessages => [
              ...prevMessages,
              {
                ...msg,
                senderId: msg.senderId.toString(),
                senderNickname: msg.senderNickname || `anony${msg.senderId}`,
                // userProfileImageUrl: msg.userProfileImageUrl,
              },
            ]);
            console.log(msg);
          }
        );
      },
      debug: str => {
        console.log('[STOMP DEBUG] ' + str);
      },
      onStompError: frame => {
        console.error('[STOMP ERROR]', frame.headers.message);
      },
      onWebSocketError: event => {
        console.error('[WEBSOCKET ERROR]', event);
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      console.log('❎ STOMP 연결 해제');
    };
  }, [chat.roomId]);

  const sendMessage = async (message: string) => {
    if (stompClient && message && myUserId) {
      const chatMessage: ChatMessageRequest = {
        userId: myUserId,
        roomId: Number(chat.roomId),
        message: message,
      };
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(chatMessage),
      });
    }
  };

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
        {messages &&
          messages.map((chat, index) => (
            <div
              key={index}
              className={`chat ${
                chat.senderId === myUserId
                  ? 'chat-end animate-displayLeft'
                  : 'chat-start animate-displayRight'
              } mb-1`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="userProfileImageUrl"
                    src={
                      chat.userProfileImageUrl ||
                      '/image/default_profile_image.webp'
                    }
                    className="w-10 h-10 rounded-full border-[1px] border-black bg-white p-[1px] mr-2"
                  />
                </div>
              </div>
              <div className="chat-header mb-1 text-[12px]">
                {chat.senderNickname}
              </div>
              <div
                className={`chat-bubble ${
                  chat.senderId === myUserId ? 'bg-primary' : 'bg-gray-300'
                } text-sm py-2`}
              >
                {chat.message}
              </div>
            </div>
          ))}
      </div>

      <ChatInput sendMessage={sendMessage} />
    </>
  );
};

export default ChatRoom;
