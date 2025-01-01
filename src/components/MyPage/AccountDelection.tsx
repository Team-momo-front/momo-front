import { useState } from 'react';
import { Link } from 'react-router-dom';

const AccountDelection = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAccount = () => {
    try {
      if (confirmDelete) {
        // TODO: 회원 탈퇴 및 로그아웃 요청
        // TODO: 요청 성공시 회원 탈퇴 완료 alert 보여주기 & 처리 전에는 처리중... 상태 보여주기
      }
    } catch {
      console.error('error');
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-open">
      <div className="modal-box flex flex-col items-center gap-4 w-[440px]">
        <span className="font-bold text-xl mb-4">회원 탈퇴</span>
        <div className="flex flex-col items-center">
          <span className="">탈퇴 후에는 모든 데이터가 삭제됩니다.</span>
          <span className="">계속 진행하려면 동의해주세요.</span>
        </div>

        <label className="label cursor-pointer flex gap-2">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={confirmDelete}
            onChange={() => setConfirmDelete(!confirmDelete)}
            className="checkbox checkbox-primary"
          />
          <span className="label-text font-bold">동의합니다.</span>
        </label>
        <div className="flex gap-4">
          <Link to="/">
            <button
              type="button"
              className="btn btn-second"
              onClick={handleDeleteAccount}
              disabled={!confirmDelete}
            >
              탈퇴하기
            </button>
          </Link>
          <Link to="/mypage/my-info">
            <button type="button" className="btn btn-second">
              취소하기
            </button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default AccountDelection;
