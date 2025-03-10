import { useEffect, useState } from 'react';
import DetailPageLayout from '../components/DetailPageLayout';
import useDeleteParticipation from '../hooks/useDeleteParticipation';
import useGetMyParticipatedMeetings from '../hooks/useGetMyParticipatedMeetings';
import useParticipateMeeting from '../hooks/useParticipateMeeting';
import { Post } from '../types/Post';

const ApplyMeetingPage = ({ meeting }: { meeting: Post }) => {
  const { data, refetch } = useGetMyParticipatedMeetings({});
  const appliedMeetingIds = data?.meetingIds;
  const participatingIds = data?.participationIds;
  const [hasApplied, setHasApplied] = useState(
    !!appliedMeetingIds?.includes(meeting.id)
  );

  let participatingId = 0;
  if (participatingIds && appliedMeetingIds) {
    participatingId = participatingIds[appliedMeetingIds.indexOf(meeting.id)];
  }

  const { mutate: participateMeeting, isSuccess: participateMeetingIsSuccess } =
    useParticipateMeeting(meeting.id);
  const {
    mutate: cancelParticipation,
    isSuccess: cancelParticipationIsSuccess,
  } = useDeleteParticipation();

  const handleCancelParticipation = () => {
    cancelParticipation(participatingId);
  };

  const handleParticipate = () => {
    participateMeeting();
  };

  if (participateMeetingIsSuccess || cancelParticipationIsSuccess) refetch();

  useEffect(() => {
    setHasApplied(!!appliedMeetingIds?.includes(meeting.id));
  }, [appliedMeetingIds]);

  return (
    <DetailPageLayout
      meeting={meeting}
      buttonLabel={hasApplied ? '신청취소' : '신청'}
      onClick={hasApplied ? handleCancelParticipation : handleParticipate}
    />
  );
};

export default ApplyMeetingPage;
