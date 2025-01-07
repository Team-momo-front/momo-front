import { useLocation } from 'react-router-dom';

const UserProfileBtn = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const isApplicantView = location.pathname.startsWith('/view-applicant');
  const isChatView = location.pathname.startsWith('/chat');

  return (
    <>
      {isApplicantView && status === 'pending' && (
        <>
          <button type="button" className="btn btn-second">
            승인
          </button>
          <button type="button" className="btn btn-primary">
            거절
          </button>
        </>
      )}
      {isChatView && (
        <>
          <button type="button" className="btn btn-second">
            뒤로가기
          </button>
          <button type="button" className="btn btn-primary">
            내보내기
          </button>{' '}
        </>
      )}
    </>
  );
};

export default UserProfileBtn;
