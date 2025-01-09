import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
  roomId: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: 채팅 메세지 전송 API 호출
    console.log(message);
    console.log(roomId);
  };

  return (
    <form onSubmit={handleSendText} className="relative bottom-12 z-10">
      <input
        className="w-full h-12 rounded-full shadow-md px-6 py-[14px] pr-10 text-sm overflow-y-hidden resize-none flex items-center box-border focus:outline-none focus:border-shadow-md"
        placeholder="메세지를 입력하세요"
        onChange={e => setMessage(e.target.value)}
      />
      <button className="absolute right-4 h-12 bottom-0 cursor-pointer">
        <IoSend />
      </button>
    </form>
  );
};

export default ChatInput;
