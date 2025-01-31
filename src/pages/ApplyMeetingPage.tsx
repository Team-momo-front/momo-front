import DetailPageLayout from '../components/DetailPageLayout';
import useGetMyParticipatedMeetings from '../hooks/useGetMyParticipatedMeetings';
import useParticipateMeeting from '../hooks/useParticipateMeeting';
import { Post } from '../types/Post';

const ApplyMeetingPage = ({ meeting }: { meeting: Post }) => {
  const { data } = useGetMyParticipatedMeetings({});
  const appliedMeetingIds = data?.meetingIds;
  let hasApplied = false;
  if (appliedMeetingIds?.includes(meeting.id)) hasApplied = true;

  const { mutate: participateMeeting } = useParticipateMeeting(meeting.id);

  const handleClick = () => {};

  const handleParticipate = () => {
    participateMeeting();
  };

  return (
    <DetailPageLayout
      meeting={meeting}
      buttonLabel={hasApplied ? '신청취소' : '신청'}
      onClick={hasApplied ? handleClick : handleParticipate}
    />
  );
};

export default ApplyMeetingPage;
