import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isViewParticipantListOpenState } from '../states/recoilState';

const UserProfileBtn = ({ roomId }: { roomId: number }) => {
  const setIsViewParticipantListOpen = useSetRecoilState(
    isViewParticipantListOpenState
  );

  const location = useLocation();
  const { userId } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const isApplicantView = location.pathname.startsWith('/view-applicant');
  const isChatView = location.pathname.startsWith('/chat');

  const navigate = useNavigate();

  const handleApproveUser = () => {
    // TODO: 참여 승인 API 호출
    // BE에 status 값 확인
  };

  const handleDenyUser = () => {
    // TODO: 참여 거부 API 호출
    // BE에 status 값 확인
  };

  const handleGoToChatRoom = () => {
    setIsViewParticipantListOpen(true);
    navigate(-1);
  };

  const handleWithdrawalUser = () => {
    // TODO: 회원 강퇴 API 호출
    console.log(userId);
    console.log(roomId);
  };

  return (
    <>
      {isApplicantView && status === 'pending' && (
        <>
          <button
            type="button"
            className="btn btn-second"
            onClick={handleApproveUser}
          >
            승인
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDenyUser}
          >
            거절
          </button>
        </>
      )}
      {isChatView && (
        <>
          <button
            type="button"
            className="btn btn-second"
            onClick={handleGoToChatRoom}
          >
            뒤로가기
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleWithdrawalUser}
          >
            내보내기
          </button>
        </>
      )}
    </>
  );
};

export default UserProfileBtn;
