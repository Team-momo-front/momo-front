const ChatModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[40px] shadow-lg min-w-80 min-h-[75vh]">
        <div className="w-full font-bold text-xl flex items-center justify-center border-b-[1px] border-gray-300 pb-5">
          <span className="block">채팅</span>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
