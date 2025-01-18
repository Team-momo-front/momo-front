import DetailPageLayout from '../components/DetailPageLayout';
import type { CreateMeetingResponse } from '../types/Meeting';

const ApplyMeetingPage = ({ meeting }: { meeting: CreateMeetingResponse }) => {
  const hasApplied = false; // TODO
  const handleClick = () => {};

  return (
    <DetailPageLayout
      meeting={meeting}
      buttonLabel={hasApplied ? '신청취소' : '신청'}
      onClick={handleClick}
    />
  );
};

export default ApplyMeetingPage;
