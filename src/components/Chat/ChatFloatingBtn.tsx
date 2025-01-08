const ChatFloatingBtn = () => {
  return (
    <button
      type="button"
      //   onClick={}
      className="fixed bg-primary w-[100px] h-[100px] rounded-full bottom-10 right-10 flex justify-center items-center"
    >
      <img src="/public/chat.svg" alt="floating chatting button" />
    </button>
  );
};

export default ChatFloatingBtn;
