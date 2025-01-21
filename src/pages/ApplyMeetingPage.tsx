import DetailPageLayout from '../components/DetailPageLayout';
import { Post } from '../types/Post';

const ApplyMeetingPage = ({ meeting }: { meeting: Post }) => {
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
