import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  isChatModalOpenState,
  isViewParticipantListOpenState,
} from '../states/recoilState';
import { useApproveParticipation } from '../hooks/useApproveParticipation';
import { useRejectParticipation } from '../hooks/useRejectParticipation';
import { useWithdrawChatParticipant } from '../hooks/useWithdrawChatParticipant';

const UserProfileBtn = () => {
  const { userId, roomId, participationId } = useParams();
  const { mutate: approveParticipation } = useApproveParticipation(
    Number(roomId)
  );
  const { mutate: rejectParticipation } = useRejectParticipation(
    Number(roomId)
  );
  const setIsViewParticipantListOpen = useSetRecoilState(
    isViewParticipantListOpenState
  );
  const { mutate: withdrawChatParticipation } = useWithdrawChatParticipant(
    Number(roomId),
    Number(userId)
  );

  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const hostId = queryParams.get('hostId');
  const isApplicantView = location.pathname.startsWith('/view-applicant');
  const isChatView = location.pathname.startsWith('/chat');
  const loginUserId = localStorage.getItem('userId');
  const isHostUserView = hostId === loginUserId;
  const isHostProfile = hostId === userId;

  const navigate = useNavigate();

  const handleApproveUser = () => {
    try {
      approveParticipation(Number(participationId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDenyUser = () => {
    rejectParticipation(Number(participationId));
  };

  const handleGoToChatRoom = () => {
    setIsViewParticipantListOpen(true);
    setIsChatModalOpen(true);
    navigate(-1);
  };

  const handleWithdrawalUser = () => {
    if (confirm('정말 내보내겠습니까?')) withdrawChatParticipation();
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
          {isHostUserView && !isHostProfile && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleWithdrawalUser}
            >
              내보내기
            </button>
          )}
        </>
      )}
    </>
  );
};

export default UserProfileBtn;
