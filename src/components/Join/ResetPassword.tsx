import { useState } from 'react';
import Input from '../Input';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { sendLinkToEmail } from '../../api/uesrs';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: sendLinkToEmail,
    onSuccess: () => {
      setError(null);
      setSuccess(
        '입력하신 이메일로 비밀번호 재설정 링크가 발송되었습니다. 메일을 확인해주세요.'
      );
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 404) {
          setError(err.response.data.message);
        } else setError('서버 오류가 발생했습니다.');
      } else {
        setError('오류가 발생했습니다.');
      }
    },
  });

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
  };

  const handleConfirmBtn = () => {
    setSuccess(null);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <form
        onSubmit={e => handleResetPassword(e)}
        className="w-[320px] h-[340px] flex flex-col items-center gap-4"
      >
        <span className="font-bold text-2xl">비밀번호 재설정</span>
        <p className="text-sm text-center">
          가입하신 이메일 주소를 입력하시면
          <br />
          비밀번호 재설정 링크를 발송해드립니다.
        </p>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={e => setEmail(e.target.value)}
          required
        />

        {success && (
          <div
            role="alert"
            className="absolute w-[400px] bg-white alert flex flex-col gap-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-gray-400 h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="w-full font-bold text-sm text-center">{success}</p>
            <div>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleConfirmBtn}
              >
                확인
              </button>
            </div>
          </div>
        )}
        {error && (
          <p className="w-full font-bold text-sm text-error text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!!success || isPending}
          className="btn btn-block font-bold text-[16px] btn-primary border-none"
        >
          {isPending ? (
            <span className="loading loading-ring loading-md text-gray-600"></span>
          ) : (
            '비밀번호 재설정 링크 받기'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
