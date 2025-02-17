import { useSetRecoilState } from 'recoil';
import {
  isChatModalOpenState,
  isChatRoomOpenState,
  isChatListOpenState,
  isViewParticipantListOpenState,
} from '../../states/recoilState';

interface ChatAlertProps {
  handleCancelBtn: () => void;
  roomId: number;
  isHostUser: boolean;
}

const ChatAlert: React.FC<ChatAlertProps> = ({
  handleCancelBtn,
  roomId,
  isHostUser,
}) => {
  const setIsChatModalOpen = useSetRecoilState(isChatModalOpenState);
  const setIsChatListOpen = useSetRecoilState(isChatListOpenState);
  const setIsChatRoomOpen = useSetRecoilState(isChatRoomOpenState);
  const setIsViewParticipantListOpen = useSetRecoilState(
    isViewParticipantListOpenState
  );

  const handleLeaveChatRoom = () => {
    // TODO: API 참가한 모임에서 DELETE 요청
    // /api/v1/chatrooms/{roomId}/leave
    console.log('exit', roomId);
    // 모달 상태 초기화 코드
    setIsChatModalOpen(false);
    setIsChatListOpen(true);
    setIsChatRoomOpen(false);
    setIsViewParticipantListOpen(false);
  };

  return (
    <dialog id="my_modal_5" className="modal modal-open">
      <div className="modal-box flex flex-col items-center gap-4 w-[280px]">
        <div className="flex flex-col items-center">
          {isHostUser ? (
            <span className="font-bold text-sm text-center">
              채팅을 삭제하면 모임도 삭제됩니다.
              <br />
              정말 삭제하시겠습니까?
            </span>
          ) : (
            <>
              <span className="font-bold text-sm text-center">
                채팅을 나가면 모임도 나가집니다.
                <br />
                정말 나가시겠습니까?
              </span>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="btn btn-sm btn-second"
            onClick={handleLeaveChatRoom}
          >
            확인
          </button>
          <button
            type="button"
            className="btn btn-sm btn-second"
            onClick={handleCancelBtn}
          >
            취소
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ChatAlert;
