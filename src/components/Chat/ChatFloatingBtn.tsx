import { IoChatbubbleEllipses } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { isChatModalOpenState } from '../../states/recoilState';
import ChatModal from './ChatModal';

const ChatFloatingBtn = () => {
  const [isChatModalOpen, setIsChatModalOpen] =
    useRecoilState(isChatModalOpenState);

  // 로그인 유저만 보이도록 구현
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsChatModalOpen(!isChatModalOpen);
        }}
        className="fixed bg-primary w-[100px] h-[100px] rounded-full bottom-10 right-10 flex justify-center items-center z-50 animate-upDown"
      >
        <IoChatbubbleEllipses className="text-white w-16 h-16" />
      </button>
      {isChatModalOpen && <ChatModal />}
    </>
  );
};

export default ChatFloatingBtn;
