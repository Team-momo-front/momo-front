import DetailPageLayout from '../components/DetailPageLayout';
import useDeleteParticipation from '../hooks/useDeleteParticipation';
import useGetMyParticipatedMeetings from '../hooks/useGetMyParticipatedMeetings';
import useParticipateMeeting from '../hooks/useParticipateMeeting';
import { Post } from '../types/Post';

const ApplyMeetingPage = ({ meeting }: { meeting: Post }) => {
  const { data } = useGetMyParticipatedMeetings({});
  const appliedMeetingIds = data?.meetingIds;
  let hasApplied = false;
  if (appliedMeetingIds?.includes(meeting.id)) hasApplied = true;

  const { mutate: participateMeeting } = useParticipateMeeting(meeting.id);
  const { mutate: cancelParticipation } = useDeleteParticipation(
    Number(localStorage.getItem('userId'))
  );

  const handleCancelParticipation = () => {
    cancelParticipation();
  };

  const handleParticipate = () => {
    participateMeeting();
  };

  return (
    <DetailPageLayout
      meeting={meeting}
      buttonLabel={hasApplied ? '신청취소' : '신청'}
      onClick={hasApplied ? handleCancelParticipation : handleParticipate}
    />
  );
};

export default ApplyMeetingPage;
