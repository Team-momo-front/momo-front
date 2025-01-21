import DetailPageLayout from '../components/DetailPageLayout';
import useParticipateMeeting from '../hooks/useParticipateMeeting';
import { Post } from '../types/Post';

const ApplyMeetingPage = ({ meeting }: { meeting: Post }) => {
  const hasApplied = false; // TODO: 참여신청한 목록 조회에서 반환하는 meetingId로 처리해야할 것 같습니다.
  const { mutate: participateMeeting } = useParticipateMeeting(meeting.id);
  const handleClick = () => {};

  const handleParticipate = () => {
    participateMeeting(meeting.id);
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
