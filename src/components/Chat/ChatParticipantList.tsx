import { RxHamburgerMenu } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import { ChatRoomResponse } from '../../types/Chat';
import { Link } from 'react-router-dom';
import ChatAlert from './ChatAlert';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isChatModalOpenState } from '../../states/recoilState';
import useGetChatParticipants from '../../hooks/useGetChatParticipants';

interface ChatParticipantListProps {
  chat: ChatRoomResponse;
  handleBackBtn: (chat: ChatRoomResponse) => void;
}

const ChatParticipantList = ({
  chat,
  handleBackBtn,
}: ChatParticipantListProps) => {
  const { data: chatParticipants } = useGetChatParticipants(chat.roomId);
  const setIsModalOpen = useSetRecoilState(isChatModalOpenState);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCancelBtn = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full font-bold text-xl flex items-center border-b-[1px] border-gray-300 pb-5 pt-1">
        <button
          type="button"
          onClick={() => handleBackBtn(chat)}
          className="mr-4"
        >
          <RxHamburgerMenu />
        </button>
        <div className="flex justify-between items-center flex-1 max-w-[80%] gap-4">
          <span className="block text-lg truncate">{chat.meetingTitle}</span>
        </div>
      </div>

      <ul className="flex flex-col my-4 gap-4">
        {chatParticipants &&
          chatParticipants.map((participant, index) => (
            <Link
              key={index}
              to={`/chat/profile/${chat.roomId}/${participant.id}`}
              onClick={() => setIsModalOpen(false)}
            >
              <li className="flex gap-2 items-center cursor-pointer hover:translate-x-1 duration-300 ease-in-out">
                <img
                  src={participant.profileImageUrl}
                  alt="participant profile image"
                  className="w-10 h-10 rounded-full border-[1px] border-black bg-white p-[1px] mr-2"
                />
                <span className="font-bold">{participant.nickname}</span>
              </li>
            </Link>
          ))}
      </ul>

      <button
        type="button"
        onClick={() => setIsAlertOpen(true)}
        className="absolute bottom-0"
      >
        <MdLogout className="text-2xl cursor-pointer" />
      </button>

      {isAlertOpen && (
        <ChatAlert handleCancelBtn={handleCancelBtn} roomId={chat.roomId} />
      )}
    </div>
  );
};

export default ChatParticipantList;
