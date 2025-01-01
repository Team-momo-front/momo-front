import HostedMeetings from './HostedMeetings';

const MyMeetings = () => {
  return (
    <div className="w-full">
      <div className="w-[680px] m-auto flex flex-col items-center justify-center mt-[30px]">
        <div className="flex h-6 text-16px items-center">
          <span className="text-[16px] cursor-pointer hover:font-bold transition-all">
            주최한 모임
          </span>
          <div className="divider divider-horizontal"></div>
          <span className="text-[16px] cursor-pointer hover:font-bold transition-all">
            신청한 모임
          </span>
        </div>
        <HostedMeetings />
      </div>
    </div>
  );
};

export default MyMeetings;
