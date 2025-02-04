import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  isChatModalOpenState,
  isViewParticipantListOpenState,
} from '../states/recoilState';
import { useApproveParticipation } from '../hooks/useApproveParticipation';
import { useRejectParticipation } from '../hooks/useRejectParticipation';

const UserProfileBtn = ({
  roomId,
  participationId,
}: {
  roomId: number;
  participationId: number;
}) => {
  const { mutate: approveParticipation } = useApproveParticipation();
  const { mutate: rejectParticipation } = useRejectParticipation();
  const setIsViewParticipantListOpen = useSetRecoilState(
    isViewParticipantListOpenState
  );
  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const isApplicantView = location.pathname.startsWith('/view-applicant');
  const isChatView = location.pathname.startsWith('/chat');

  const navigate = useNavigate();

  const handleApproveUser = () => {
    try {
      approveParticipation(Number(participationId));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDenyUser = () => {
    rejectParticipation(Number(participationId));
    // navigate(-1);
  };

  const handleGoToChatRoom = () => {
    setIsViewParticipantListOpen(true);
    setIsChatModalOpen(true);
    navigate(-1);
  };

  const handleWithdrawalUser = () => {
    // TODO: 회원 강퇴 API 호출
    console.log(participationId);
    console.log(roomId);
  };

  return (
    <>
      {isApplicantView && status === 'PENDING' && (
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
            className="btn btn-second"
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
