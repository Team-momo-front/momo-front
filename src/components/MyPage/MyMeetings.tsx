import { useState } from 'react';
import HostedMeetings from './HostedMeetings';
import ParticipatedMeetings from './ParticipatedMeetings';

const MyMeetings = () => {
  const [isActive, setIsActive] = useState('hosted');

  return (
    <div className="w-full">
      <div className="w-[680px] m-auto flex flex-col items-center justify-center mt-[30px]">
        <div className="flex h-6 text-16px items-center">
          <span
            className="text-[16px] cursor-pointer hover:font-bold transition-all"
            onClick={() => setIsActive('hosted')}
          >
            주최한 모임
          </span>
          <div className="divider divider-horizontal"></div>
          <span
            className="text-[16px] cursor-pointer hover:font-bold transition-all"
            onClick={() => setIsActive('participated')}
          >
            신청한 모임
          </span>
        </div>
        {isActive === 'hosted' && <HostedMeetings />}
        {isActive === 'participated' && <ParticipatedMeetings />}
      </div>
    </div>
  );
};

export default MyMeetings;
