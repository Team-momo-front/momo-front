import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSendText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSendText}
      className="absolute bottom-4 left-4 right-4 z-10"
    >
      <input
        className="w-full h-12 rounded-full shadow-md px-6 py-[14px] pr-10 text-sm overflow-y-hidden resize-none flex items-center box-border focus:outline-none focus:border-shadow-md"
        placeholder="메세지를 입력하세요"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="absolute right-4 h-12 bottom-0 cursor-pointer"
        type="submit"
      >
        <IoSend />
      </button>
    </form>
  );
};

export default ChatInput;
