import { useState } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import JoinField from './JoinField';
import axiosInstance from '../../api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const VerifyEmailCode = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState<string>('');
  const [emailConfirmCodeError, setEmailConfirmCodeError] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const confirmEmailCode = async (code: string) => {
    const response = await axiosInstance.post(
      '/api/v1/users/signup/verify',
      null,
      {
        params: {
          code: code,
        },
      }
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: confirmEmailCode,
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response) {
          // 인증코드 불일치
          if (err.response.status === 400) {
            setEmailConfirmCodeError(err.response.data.message);
          } else {
            setEmailConfirmCodeError(err.response.data.message);
          }
        }
      }
    },
  });

  const handleEmailConfirmCodeValidation = () => {
    mutate(emailConfirmCode);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isPending ? (
        <div className="flex justify-center items-center gap-4 w-[440px]">
          <span className="loading loading-spinner w-16 text-gray-600"></span>
        </div>
      ) : (
        <div className="max-w-[538px] flex gap-x-6">
          <div className="w-[320px] flex flex-col gap-4">
            <JoinField
              name="emailConfirmCode"
              label="인증 코드"
              type="text"
              value={emailConfirmCode}
              onChange={e => {
                setEmailConfirmCode(e.target.value);
              }}
              error={emailConfirmCodeError}
              placeholder="인증 코드를 입력해주세요."
              required
            />

            <button
              type="button"
              className="mt-7 btn btn-primary font-bold text-sm"
              onClick={handleEmailConfirmCodeValidation}
            >
              이메일 인증
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <dialog id="my_modal_5" className="modal modal-open sm:modal-middle ">
          <div className="modal-box flex flex-col items-center gap-2">
            <p className="py-3 font-bold">
              축하합니다! 회원가입이 완료되었습니다!
            </p>
            <Link to="/login">
              <button type="button" className="btn btn-primary">
                로그인 하러 가기
              </button>
            </Link>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default VerifyEmailCode;
