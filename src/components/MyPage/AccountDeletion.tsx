import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';

const deleteAccount = async () => {
  const response = await axiosInstance.delete('/api/v1/users');
  return response.data;
};
const AccountDeletion = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginUserType');
      localStorage.removeItem('hasProfile');
      navigate('/');
    },
    onError: error => {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    },
  });

  const handleDeleteAccount = async () => {
    try {
      if (confirmDelete) {
        mutate();
      }
    } catch {
      console.error('error');
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center gap-4 w-[440px]">
        <LoadingSpinner />
      </div>
    );
  }

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
          <Link to="/mypage/my-profile">
            <button type="button" className="btn btn-second">
              취소하기
            </button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default AccountDeletion;
