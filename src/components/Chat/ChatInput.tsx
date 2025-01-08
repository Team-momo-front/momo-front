import { IoSend } from 'react-icons/io5';

const ChatInput = () => {
  const handleSendText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: API 호출
  };

  return (
    <form onSubmit={handleSendText} className="relative bottom-12 z-10">
      <textarea
        className="w-full h-12 rounded-full shadow-md px-6 py-[14px] pr-10 text-sm overflow-y-hidden resize-none flex items-center box-border focus:outline-none focus:border-shadow-md"
        placeholder="메세지를 입력하세요"
      />
      <button className="absolute right-4 h-12 bottom-0 cursor-pointer">
        <IoSend />
      </button>
    </form>
  );
};

export default ChatInput;
