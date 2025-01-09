import { useRecoilState } from 'recoil';
import { isChatModalOpenState } from '../../states/recoilState';
import ChatModal from './ChatModal';

const ChatFloatingBtn = () => {
  const [isChatModalOpen, setIsChatModalOpen] =
    useRecoilState(isChatModalOpenState);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsChatModalOpen(!isChatModalOpen);
        }}
        className="fixed bg-primary w-[100px] h-[100px] rounded-full bottom-10 right-10 flex justify-center items-center z-50 animate-upDown"
      >
        <img src="/public/chat.svg" alt="floating chatting button" />
      </button>

      {isChatModalOpen && <ChatModal />}
    </>
  );
};

export default ChatFloatingBtn;
